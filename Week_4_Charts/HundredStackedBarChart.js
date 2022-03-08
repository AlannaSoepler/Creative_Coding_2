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
    this.tickBarIncrements = this.chartHeight / this.tickBar;
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
    let listValues = this.data.map(function (x) {
      return x.Total_Dwelling;
    });
    this.maxValue = max(listValues);
    this.maxValue = Math.ceil(this.maxValue / this.rounding) * this.rounding;
    this.tickIncrements = this.maxValue / this.numTicks;
  }

  //This function expects a parameter and scales it using the max value and chart hight
  scaleData(num, total) {
    return map(num, 0, total, 0, this.chartHeight);
  }

  drawAxis() {
    stroke(199, 206, 211, 180);
    strokeWeight(1);
    line(0, 0, 0, -this.chartHeight); //y
    line(0, 0, this.chartWidth, 0); //x
  }

  drawTicks() {
    for (let i = 0; i <= this.numTicks; i++) {
      fill(199, 206, 211);
      noStroke();
      textSize(this.tickSize);
      textAlign(RIGHT, CENTER);
      text(
        (i * this.tickIncrements).toFixed(this.numDecimals),
        -this.tickMargin,
        this.tickSpacing * -i
      );
    }
  }

  drawHorizontalLine() {
    for (let i = 0; i <= this.numTicks; i++) {
      stroke(199, 206, 211, 200);
      strokeWeight(0.5);
      line(0, this.tickSpacing * -i, this.chartWidth, this.tickSpacing * -i);
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

  drawRects() {
    push();
    translate(this.margin, 0);
    for (let i = 0; i < this.data.length; i++) {
      noStroke();
      push();
      for (let j = 0; j < 1; j++) {
        let colorNumb = i % 1;

        fill(this.colors[colorNumb]);
        rect(
          (this.barWidth + this.spacing) * i,
          0,
          this.barWidth,
          this.scaleData(-this.data[i].All_Houses, this.data[i].Total_Dwelling)
        );
        translate(
          0,
          this.scaleData(-this.data[i].All_Houses, this.data[i].Total_Dwelling)
        );
        fill(this.colors[colorNumb + 1]);
        rect(
          (this.barWidth + this.spacing) * i,
          0,
          this.barWidth,
          this.scaleData(-this.data[i].Apartments, this.data[i].Total_Dwelling)
        );
      }
      pop();
    }
    pop();
  }

  barValue() {
    push();
    translate(this.margin, 0);
    for (let i = 0; i < this.data.length; i++) {
      if (this.showValues) {
        noStroke();
        push();
        fill(199, 206, 211);
        textSize(this.valueFontSize);
        textAlign(CENTER, CENTER);
        text(
          this.data[i].All_Houses,
          (this.barWidth + this.spacing) * i + this.barWidth / 2,
          this.scaleData(
            -this.data[i].All_Houses,
            this.data[i].Total_Dwelling
          ) / 2
        );
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

  legend() {
    if (this.showLegend) {
      rectMode(CENTER);
      noStroke();
      fill(199, 206, 211);
      textSize(this.bodyFontSize);
      textAlign(LEFT, CENTER);
      fill('#ea7369');
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
      fill('#af4bce');
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

  //Need to add it to scale
  drawAvg() {
    push();
    translate(this.margin, 0);
    noFill();
    strokeWeight(3);
    stroke(128, 24, 160);
    beginShape();
    for (let i = 0; i < this.data.length; i++) {
      vertex(
        (this.barWidth + this.spacing) * i + this.barWidth / 2,
        this.scaleData(-this.data[i].average)
      );
      ellipse(
        (this.barWidth + this.spacing) * i + this.barWidth / 2,
        this.scaleData(-this.data[i].average),
        6
      );
    }
    endShape();
    pop();
  }
}
