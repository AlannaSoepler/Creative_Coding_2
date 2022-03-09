class BarChart {
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
    this.tickBar;
    this.numDecimals;
    this.bodyFontSize;
    this.titleFontSize;
    this.valueFontSize;
    this.verticalAxisTitleText;
    this.verticalAxisMargin;
    this.horizontalAxisTitleText;
    this.horizontalAxisMargin;
    this.horizontalFontSize;
    this.verticalFontSize;
    this.rounding;
    this.showValues = true;
    this.showLabels = true;
    this.rotateLabels = true;
    this.showHorizontalLine = true;
    this.showTitle = true;
    this.showVerticalAxisTitle = true;
    this.showHorizontalAxisTitle = true;

    this.colors = [
      color('#af4bce'),
      color('#eb548c'),
      color('#ea7369'),
      color('#f0a58f'),
    ];
    //Calling these functions
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
    //calling the functions and setting the charts position
    push();
    translate(this.pos.posX, this.pos.posY);
    this.title();
    this.horizontalAxisTitle();
    this.verticalAxisTitle();
    this.drawAxis();
    this.drawTicks();
    this.drawHorizontalLine();
    this.drawRects();
    this.textLabel();
    this.barValue();
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
    //Rounds up the highest number
    this.maxValue = Math.ceil(this.maxValue / this.rounding) * this.rounding;
    //Calculates the value that will be displayed by the ticks
    this.tickIncrements = this.maxValue / this.numTicks;
  }

  //This function expects a parameter and scales it from between 0 and maxValue to 0 and the  chartHight
  scaleData(num) {
    return map(num, 0, this.maxValue, 0, this.chartHeight);
  }

  //Draws the axes lines
  drawAxis() {
    stroke(199, 206, 211, 180);
    strokeWeight(2);
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
        //give the color slight opacity
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
      //TitleMargin to give it more space from the top of the chart
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
      //Margin to give it more space from the chart
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

  //Draws the bars in the chart
  drawRects() {
    //Stores the original origin point
    push();
    //The new origin point
    translate(this.margin, 0);
    //Iterates based on the number of elements in the array
    for (let i = 0; i < this.data.length; i++) {
      //Assigning a new variable that will check if i goes into 4
      let colorNumb = i % 4;
      //Changes the color
      fill(this.colors[colorNumb]);
      noStroke();
      //From the new origin point draw the rect from the new x position * i
      //The y position will remain the same
      //The width of the bar is calculated above
      //Then the hight of the bar will be the value of the scaled value taken from the data array
      rect(
        (this.barWidth + this.spacing) * i,
        0,
        this.barWidth,
        this.scaleData(-this.data[i].Total_Dwelling)
      );
    }
    //Back to the original origin point
    pop();
  }

  barValue() {
    //Stores the original origin point
    push();
    //The new origin point
    translate(this.margin, 0);
    for (let i = 0; i < this.data.length; i++) {
      if (this.showValues) {
        noStroke();
        fill(199, 206, 211);
        //Value will be given in the sketch
        textSize(this.valueFontSize);
        //Where the text will be drawn from
        textAlign(CENTER, BOTTOM);
        //Will get the value from the data array named total_dwelling
        //the value changes based on i
        text(
          this.data[i].Total_Dwelling,
          (this.barWidth + this.spacing) * i + this.barWidth / 2,
          //Sends the value to the scaleData function to be scaled
          this.scaleData(-this.data[i].Total_Dwelling) - this.barValueMargin
        );
      }
    }
    //Back to the original origin point
    pop();
  }

  textLabel() {
    //Stores the original origin point
    push();
    //The new origin point
    translate(this.margin, 0);
    //Iterates based on the number of elements in the data array
    for (let i = 0; i < this.data.length; i++) {
      //if these are true then draw what is below
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
          //Rotates the text 60 degrees
          rotate(PI / 3);
          text(this.data[i].Period, 0, 0);
          pop();
        } else {
          noStroke();
          fill(199, 206, 211);
          textSize(this.bodyFontSize);
          textAlign(CENTER, TOP);
          text(
            this.data[i].Period,
            (this.barWidth + this.spacing) * i + this.barWidth / 2,
            this.labelMargin
          );
        }
      }
    }
    //Back to the original origin point
    pop();
  }
}
