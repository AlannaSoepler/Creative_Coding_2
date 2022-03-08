class BarChart {
  constructor(
    _data,
    _chartWidth,
    _chartHeight,
    _posX,
    _posY,
    _spacing,
    _margin,
    _labelMargin,
    _barValueMargin,
    _titleMargin,
    _tickMargin,
    _titleText,
    _numTicks,
    _tickSize,
    _tickBar,
    _numDecimals,
    _bodyFontSize,
    _titleFontSize,
    _valueFontSize,
    _verticalAxisTitleText,
    _verticalAxisMargin,
    _horizontalAxisTitleText,
    _horizontalAxisMargin
  ) {
    this.data = _data;
    this.chartWidth = _chartWidth;
    this.chartHeight = _chartHeight;
    this.pos = createVector(_posX, _posY);
    this.maxValue;
    this.spacing = _spacing;
    this.margin = _margin;
    this.labelMargin = _labelMargin;
    this.barValueMargin = _barValueMargin;
    this.titleMargin = _titleMargin;
    this.tickMargin = _tickMargin;
    this.titleText = _titleText;
    this.numTicks = _numTicks;
    this.tickSize = _tickSize;
    this.tickIncrements;
    this.tickBar = _tickBar;
    this.numDecimals = _numDecimals;
    this.bodyFontSize = _bodyFontSize;
    this.titleFontSize = _titleFontSize;
    this.valueFontSize = _valueFontSize;
    this.verticalAxisTitleText = _verticalAxisTitleText;
    this.verticalAxisMargin = _verticalAxisMargin;
    this.horizontalAxisTitleText = _horizontalAxisTitleText;
    this.horizontalAxisMargin = _horizontalAxisMargin;
    this.rounding = 10000;
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
    this.textLabel();
    this.barValue();
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
    stroke(199, 206, 211, 180);
    strokeWeight(2);
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
    if (this.showHorizontalLine) {
      for (let i = 0; i <= this.numTicks; i++) {
        stroke(199, 206, 211, 200);
        strokeWeight(0.5);
        line(0, this.tickSpacing * -i, this.chartWidth, this.tickSpacing * -i);
      }
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
      let colorNumb = i % 4;
      fill(this.colors[colorNumb]);
      noStroke();
      rect(
        (this.barWidth + this.spacing) * i,
        0,
        this.barWidth,
        this.scaleData(-this.data[i].Total_Dwelling)
      );
    }
    pop();
  }

  barValue() {
    push();
    translate(this.margin, 0);
    for (let i = 0; i < this.data.length; i++) {
      if (this.showValues) {
        noStroke();
        fill(199, 206, 211);
        textSize(this.valueFontSize);
        textAlign(CENTER, BOTTOM);
        text(
          this.data[i].Total_Dwelling,
          (this.barWidth + this.spacing) * i + this.barWidth / 2,
          this.scaleData(-this.data[i].Total_Dwelling) - this.barValueMargin
        );
      }
    }
    pop();
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
    pop();
  }
}
