class HorizontalBarChart {
  constructor(_data, _posX, _posY) {
    this.data = _data;
    this.chartWidth;
    this.chartHeight;
    this.pos = createVector(_posX, _posY);
    this.rounding;
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
    this.verticalAxisTitleText;
    this.verticalAxisMargin;
    this.horizontalAxisTitleText;
    this.horizontalAxisMargin;
    this.horizontalFontSize;
    this.verticalFontSize;

    this.showValues = true;
    this.showLabels = true;
    this.rotateLabels = false;
    this.showVerticalLine = true;
    this.showTitle = true;
    this.showVerticalAxisTitle = true;
    this.showHorizontalAxisTitle = true;

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
    this.tickSpacing = this.chartWidth / this.numTicks; //space between ticks on  the left
    this.availableHight =
      this.chartHeight -
      2 * this.margin -
      (this.data.length - 1) * this.spacing; //available space for bars
    this.barHight = this.availableHight / this.data.length; //bar width
    this.completeSpacing = this.barHight + this.spacing;
  }
  calculateMaxValue() {
    //Assigning a variable called listValues
    //creates a new array of all the values withing the data.total_Dwelling
    let listValues = this.data.map(function (x) {
      return x.Total_Dwelling;
    });

    //Finds the hights number
    this.maxValue = max(listValues);
    //Rounds up the highest number(depends on the value of rounding)
    this.maxValue = Math.ceil(this.maxValue / this.rounding) * this.rounding;
    //Calculates the value that will be displayed by the ticks
    this.tickIncrements = this.maxValue / this.numTicks;
  }
  render() {
    push();
    translate(this.pos.posX, this.pos.posY);
    this.drawAxis();
    this.drawTicks();
    this.drawVerticalLine();
    this.drawRects();
    this.title();
    this.verticalAxisTitle();
    this.horizontalAxisTitle();
    this.barValue();
    this.textLabel();
    pop();
  }
  scaleData(num) {
    return map(num, 0, this.maxValue, 0, this.chartWidth);
  }
  drawAxis() {
    stroke(199, 206, 211, 180);
    strokeWeight(2);
    line(0, 0, 0, -this.chartHeight);
    line(0, 0, this.chartWidth, 0);
  }

  //Draws the vertical lines
  drawVerticalLine() {
    if (this.showVerticalLine) {
      for (let i = 0; i <= this.numTicks; i++) {
        //give the color slight opacity
        stroke(199, 206, 211, 200);
        strokeWeight(0.5);
        //Same as in draw ticks. Will draw at the same place, but it will be as long as the chart
        line(this.tickSpacing * i, 0, this.tickSpacing * i, -this.chartHeight);
      }
    }
  }

  //Draws the ticks
  drawTicks() {
    //Saves the current origin point
    push();
    //New origin point
    //Negative in the y position to go up the y axis
    translate(0, -this.margin);
    //Iterates though the number of ticks
    for (let i = 0; i <= this.numTicks; i++) {
      let drawTick = this.chartWidth / this.numTicks;
      fill(199, 206, 211);
      noStroke();
      textSize(this.tickSize);
      textAlign(CENTER);
      push();
      translate(drawTick * i, this.tickMargin);
      //rotate(PI / 2);
      text((this.tickIncrements * i).toFixed(this.numDecimals), 0, 0);
      pop();
    }
    pop();
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
    //The origin goes up the y axis
    translate(0, -this.margin);
    for (let i = 0; i < this.data.length; i++) {
      let colorNumb = i % 4;
      fill(this.colors[colorNumb]);
      noStroke();
      //This time it is the y position that need to be changed
      //It is negative because it is going up the y axis
      rect(
        0,
        -this.completeSpacing * i,
        this.scaleData(this.data[i].Total_Dwelling),
        -this.barHight
      );
    }
    pop();
  }

  barValue() {
    push();
    translate(0, -this.margin);
    for (let i = 0; i < this.data.length; i++) {
      if (this.showValues) {
        noStroke();
        fill(199, 206, 211);
        textSize(this.valueFontSize);
        textAlign(LEFT, CENTER);
        text(
          this.data[i].Total_Dwelling,
          this.scaleData(this.data[i].Total_Dwelling) + this.barValueMargin,
          -this.completeSpacing * i - this.barHight / 2
        );
      }
    }
    pop();
  }

  textLabel() {
    //Stores the original origin point
    push();
    translate(0, -this.margin);
    for (let i = 0; i < this.data.length; i++) {
      if (this.showLabels) {
        if (this.rotateLabels) {
          push();
          noStroke();
          fill(199, 206, 211);
          textSize(this.bodyFontSize);
          textAlign(CENTER, CENTER);
          translate(0, 0);
          rotate((3 * PI) / 2);
          text(
            this.data[i].Period,
            this.completeSpacing * i + this.barHight / 2,
            -this.labelMargin
          );
          pop();
        } else {
          noStroke();
          fill(199, 206, 211);
          textSize(this.bodyFontSize);
          textAlign(CENTER, CENTER);
          text(
            this.data[i].Period,
            -this.labelMargin,
            -this.completeSpacing * i - this.barHight / 2
          );
        }
      }
    }
    pop();
  }
}
