class HundredStackedBarChart {
  constructor(_data, _posX, _posY) {
    this.data = _data;
    this.chartWidth;
    this.chartHeight;
    this.pos = createVector(_posX, _posY);
    this.maxValue;
    this.spacing;
    this.margin;
    this.labelMargin;
    this.barValueMargin;
    this.titleMargin;
    this.tickMargin;
    this.titleText;
    this.numTicks;
    this.tickSize;
    this.tickIncrements;
    this.numDecimals;
    this.bodyFontSize;
    this.titleFontSize;
    this.valueFontSize;
    this.horizontalFontSize;
    this.verticalFontSize;

    this.rounding;
    this.rectSize;
    this.legendMargin;
    this.legendSpacing;
    this.rectLegendMargin;

    this.showValues = true;
    this.showLabels = true;
    this.rotateLabels = true;
    this.showHorizontalLine = true;
    this.showTitle = true;
    this.showVerticalAxisTitle = true;
    this.showHorizontalAxisTitle = true;
    this.showLegend = true;

    this.colors = [
      color('#af4bce'),
      color('#eb548c'),
      color('#ea7369'),
      color('#f0a58f'),
    ];
    this.updateValues();
    this.calculateMaxValue();
  }
  updateValues() {
    this.tickSpacing = this.chartHeight / this.numTicks; //space between ticks on  the left
    this.availableWidth =
      this.chartWidth - this.margin * 2 - this.spacing * (this.data.length - 1); //available space for bars
    this.barWidth = this.availableWidth / this.data.length; //bar width
  }

  render() {
    push();
    translate(this.pos.posX, this.pos.posY);
    this.title();
    this.horizontalAxisTitle();
    this.verticalAxisTitle();
    this.drawAxis();
    this.drawTicks();
    this.drawHorizontalLine();
    this.drawRects();
    this.barValue();
    this.textLabel();
    this.legend();
    pop();
  }

  calculateMaxValue() {
    //Assigning a variable called listValues
    //creates a new array of all the values withing the data.total_Dwelling
    let listValues = this.data.map(function (x) {
      return x.Total_Dwelling;
    });

    //Finds the hights number
    this.maxValue = max(listValues);
    //Rounds up the highest number (depends on the value of rounding)
    this.maxValue = Math.ceil(this.maxValue / this.rounding) * this.rounding;
    //Calculates the value that will be displayed by the ticks
    this.tickIncrements = this.maxValue / this.numTicks;
  }

  //This function expects a parameter and scales it using the max value and chart hight
  //The scale function now accepts 2 parameters one for the value that will be scales
  //The other is total value of that object .
  scaleData(num, total) {
    return map(num, 0, total, 0, this.chartHeight);
  }

  drawAxis() {
    stroke(199, 206, 211, 180);
    strokeWeight(1);
    line(0, 0, 0, -this.chartHeight); //y
    line(0, 0, this.chartWidth, 0); //x
  }

  //Draws the ticks
  drawTicks() {
    //iterates based on the value of numTicks
    for (let i = 0; i <= this.numTicks; i++) {
      fill(199, 206, 211);
      noStroke();
      //The size will be given in the sketch
      textSize(this.tickSize);
      //Where the text will be drawn from
      textAlign(RIGHT, CENTER);
      //Takes the value that was calculated above and multiplies it by i
      //Then i make sure it has no decimals by using the toFixed command
      text(
        (i * this.tickIncrements).toFixed(this.numDecimals),
        -this.tickMargin,
        this.tickSpacing * -i
      );
    }
  }

  //Draws the horizontal lines
  drawHorizontalLine() {
    //If this is true draw the horizontal lines
    //Iterates based on the value of numTicks
    if (this.showHorizontalLine) {
      for (let i = 0; i <= this.numTicks; i++) {
        stroke(199, 206, 211, 200);
        strokeWeight(0.5);
        //Same as in draw ticks. Will draw at the same place, but it will be as long as the chart
        line(0, this.tickSpacing * -i, this.chartWidth, this.tickSpacing * -i);
      }
    }
  }

  //Draws the title
  title() {
    //If this is true draw the title
    if (this.showTitle) {
      noStroke();
      fill(199, 206, 211);
      textSize(this.titleFontSize);
      textAlign(CENTER, BOTTOM);
      text(
        this.titleText,
        this.chartWidth / 2,
        -this.chartHeight - this.titleMargin
      );
    }
  }

  //Draws the vertical axis title
  verticalAxisTitle() {
    if (this.showVerticalAxisTitle) {
      push();
      noStroke();
      fill(199, 206, 211);
      textSize(this.verticalFontSize);
      textAlign(CENTER, BOTTOM);
      //Rotates text
      rotate((3 * PI) / 2);
      text(
        this.verticalAxisTitleText,
        this.chartHeight / 2,
        -this.verticalAxisMargin
      );
      pop();
    }
  }

  //Draws the horizontal axis title
  horizontalAxisTitle() {
    if (this.showHorizontalAxisTitle) {
      noStroke();
      fill(199, 206, 211);
      textSize(this.horizontalFontSize);
      textAlign(CENTER, TOP);
      text(
        this.horizontalAxisTitleText,
        this.chartWidth / 2,
        this.horizontalAxisMargin
      );
    }
  }

  drawRects() {
    push();
    translate(this.margin, 0);
    for (let i = 0; i < this.data.length; i++) {
      noStroke();
      push();
      //A nested for loop is required to stack the bar on top of each other
      //before moving the x position
      for (let j = 0; j < 1; j++) {
        let colorNumb = i % 1;

        fill(this.colors[colorNumb]);
        rect(
          (this.barWidth + this.spacing) * i,
          0,
          this.barWidth,
          //I send two parameters to the scale function.
          this.scaleData(-this.data[i].All_Houses, this.data[i].Total_Dwelling)
        );
        //The new origin point is now hight of the previous bar
        translate(
          0,
          this.scaleData(-this.data[i].All_Houses, this.data[i].Total_Dwelling)
        );
        fill(this.colors[colorNumb + 1]);
        rect(
          (this.barWidth + this.spacing) * i,
          0,
          this.barWidth,
          //I send to parameters to the scale function.
          this.scaleData(-this.data[i].Apartments, this.data[i].Total_Dwelling)
        );
      }
      pop();
    }
    pop();
  }

  barValue() {
    //Stores the original origin point
    push();
    translate(this.margin, 0);
    for (let i = 0; i < this.data.length; i++) {
      if (this.showValues) {
        noStroke();
        //Stores the original origin point
        push();
        fill(199, 206, 211);
        textSize(this.valueFontSize);
        textAlign(CENTER, CENTER);
        //To get the value to display in the center of the bar
        //i send the the two parameters to the scale function and devied by 2
        text(
          this.data[i].All_Houses,
          (this.barWidth + this.spacing) * i + this.barWidth / 2,
          this.scaleData(
            -this.data[i].All_Houses,
            this.data[i].Total_Dwelling
          ) / 2
        );
        //The new y position for the next text
        translate(
          0,
          this.scaleData(-this.data[i].All_Houses, this.data[i].Total_Dwelling)
        );
        text(
          this.data[i].Apartments,
          (this.barWidth + this.spacing) * i + this.barWidth / 2,
          this.scaleData(
            -this.data[i].Apartments,
            this.data[i].Total_Dwelling
          ) / 2
        );
      }
      pop();
    }
    pop();
  }

  //This draws the legends
  legend() {
    //If true draw
    if (this.showLegend) {
      rectMode(CENTER);
      noStroke();
      fill(199, 206, 211);
      textSize(this.bodyFontSize);
      textAlign(LEFT, CENTER);
      //Takes the color from the colors array
      fill(this.colors[1]);
      //Draws the rect at the end of the chart
      //Draws the rect at the center hight of the canvas
      rect(
        this.chartWidth + this.rectLegendMargin,
        -this.chartHeight / 2,
        this.rectSize,
        this.rectSize
      );
      //Changes the color of the text to white
      fill(199, 206, 211);
      text(
        this.legendTitle02,
        this.chartWidth + this.legendMargin,
        -this.chartHeight / 2
      );
      fill(this.colors[0]);
      rect(
        this.chartWidth + this.rectLegendMargin,
        -this.chartHeight / 2 + this.legendSpacing,
        this.rectSize,
        this.rectSize
      );
      fill(199, 206, 211);
      text(
        this.legendTitle01,
        this.chartWidth + this.legendMargin,
        -this.chartHeight / 2 + this.legendSpacing
      );
    }
  }

  textLabel() {
    //Stores the original origin point
    push();
    translate(this.margin, 0);
    for (let i = 0; i < this.data.length; i++) {
      if (this.showLabels) {
        if (this.rotateLabels) {
          push();
          noStroke();
          fill(199, 206, 211);
          textSize(this.bodyFontSize);
          textAlign(LEFT, CENTER);
          translate(
            (this.barWidth + this.spacing) * i + this.barWidth / 2,
            this.labelMargin
          );
          rotate(PI / 3);
          text(this.data[i].Period, 0, 0);
          pop();
        } else {
          push();
          noStroke();
          fill(199, 206, 211);
          textSize(this.bodyFontSize);
          textAlign(LEFT, CENTER);
          translate(
            (this.barWidth + this.spacing) * i + this.barWidth / 2,
            this.labelMargin
          );
          rotate(PI / 2);
          text(this.data[i].Period, 0, 0);
          pop();
        }
      }
    }
    pop();
  }
}
