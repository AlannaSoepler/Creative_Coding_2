class LineChart {
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
    this.drawAxis();
    this.drawTicks();
    this.title();
    this.verticalAxisTitle();
    this.horizontalAxisTitle();
    this.drawHorizontalLine();
    this.legend();
    this.drawLabels();
    this.line01();
    this.line02();
    pop();
  }

  calculateMaxValue() {
    let listValues = this.data.map(function (x) {
      return x.Total_Dwelling;
    });
    this.maxValue = max(listValues);
    this.maxValue = Math.ceil(this.maxValue / this.rounding) * this.rounding;
    this.tickIncrements = this.maxValue / this.numTicks;
  }

  //This function expects a parameter and scales it using the max value and chart hight
  scaleData(num) {
    return map(num, 0, this.maxValue, 0, this.chartHeight);
  }

  drawAxis() {
    stroke(255, 180);
    strokeWeight(1);
    line(0, 0, 0, -this.chartHeight); //y
    line(0, 0, this.chartWidth, 0); //x
  }

  drawTicks() {
    for (let i = 0; i <= this.numTicks; i++) {
      stroke(255, 100);
      line(0, this.tickSpacing * -i, -10, this.tickSpacing * -i);

      //numbers (text)
      fill(255, 200);
      noStroke();
      textSize(11);
      textAlign(RIGHT, CENTER);
      text(
        (i * this.tickIncrements).toFixed(this.numPlaces),
        -15,
        this.tickSpacing * -i
      );
    }
  }

  title() {
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

  verticalAxisTitle() {
    if (this.showVerticalAxisTitle) {
      push();
      noStroke();
      fill(199, 206, 211);
      textSize(this.titleFontSize);
      textAlign(CENTER, BOTTOM);
      rotate((3 * PI) / 2);
      text(
        this.verticalAxisTitleText,
        this.chartHeight / 2,
        -this.verticalAxisMargin
      );
      pop();
    }
  }

  horizontalAxisTitle() {
    if (this.showHorizontalAxisTitle) {
      noStroke();
      fill(199, 206, 211);
      textSize(this.titleFontSize);
      textAlign(CENTER, TOP);
      text(
        this.horizontalAxisTitleText,
        this.chartWidth / 2,
        this.horizontalAxisMargin
      );
    }
  }

  drawHorizontalLine() {
    for (let i = 0; i <= this.numTicks; i++) {
      //ticks
      stroke(255, 100);
      line(0, this.tickSpacing * -i, this.chartWidth, this.tickSpacing * -i);
    }
  }

  legend() {
    if (this.showLegend) {
      rectMode(CENTER);
      noStroke();
      fill(199, 206, 211);
      textSize(this.bodyFontSize);
      textAlign(LEFT, CENTER);
      fill(this.colors[0]);
      rect(
        this.chartWidth + this.rectLegendMargin,
        -this.chartHeight / 2 - this.legendSpacing,
        this.rectSize,
        this.rectSize
      );
      fill(199, 206, 211);
      text(
        this.legendTitle03,
        this.chartWidth + this.legendMargin,
        -this.chartHeight / 2 - this.legendSpacing
      );
      fill(this.colors[3]);
      rect(
        this.chartWidth + this.rectLegendMargin,
        -this.chartHeight / 2,
        this.rectSize,
        this.rectSize
      );
      fill(199, 206, 211);
      text(
        this.legendTitle02,
        this.chartWidth + this.legendMargin,
        -this.chartHeight / 2
      );
    }
  }

  drawLabels() {
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

  line01() {
    push();
    translate(this.margin, 0);
    noFill();
    stroke(this.colors[3]);
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < this.data.length; i++) {
      vertex(
        (this.barWidth + this.spacing) * i + this.barWidth / 2,
        this.scaleData(-this.data[i].Apartments)
      );
      ellipse(
        (this.barWidth + this.spacing) * i + this.barWidth / 2,
        this.scaleData(-this.data[i].Apartments),
        5
      );
    }
    endShape();
    push();
  }
  line02() {
    push();
    translate(this.margin, 0);
    noFill();
    strokeWeight(2);
    stroke(this.colors[0]);
    beginShape();
    for (let i = 0; i < this.data.length; i++) {
      vertex(
        (this.barWidth + this.spacing) * i + this.barWidth / 2,
        this.scaleData(-this.data[i].All_Houses)
      );
      ellipse(
        (this.barWidth + this.spacing) * i + this.barWidth / 2,
        this.scaleData(-this.data[i].All_Houses),
        5
      );
    }
    endShape();
    push();
  }
}
