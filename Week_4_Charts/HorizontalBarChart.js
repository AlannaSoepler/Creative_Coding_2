class HorizontalBarChart {
  constructor(
    _data,
    _chartWidth,
    _chartHeight,
    _posX,
    _posY,
    _rounding,
    _spacing,
    _margin,
    _numDecimals,
    _labelMargin,
    _barValueMargin,
    _titleMargin,
    _tickMargin,
    _titleText,
    _numTicks,
    _tickSize,
    _tickBar,
    _numPlaces,
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
    this.rounding = _rounding;
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
    this.tickBarIncrements = this.chartWidth / this.tickBar;
    this.availableHight =
      this.chartHeight -
      2 * this.margin -
      (this.data.length - 1) * this.spacing; //available space for bars
    this.barHight = this.availableHight / this.data.length; //bar width
    this.completeSpacing = this.barHight + this.spacing;
  }
  calculateMaxValue() {
    let listValues = this.data.map(function (x) {
      return x.Total_Dwelling;
    });
    this.maxValue = max(listValues);
    this.maxValue = Math.ceil(this.maxValue / this.rounding) * this.rounding;
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
    this.lines();
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
  drawVerticalLine() {
    if (this.showVerticalLine) {
      for (let i = 0; i <= this.numTicks; i++) {
        stroke(199, 206, 211, 200);
        strokeWeight(0.5);
        line(this.tickSpacing * i, 0, this.tickSpacing * i, -this.chartHeight);
      }
    }
  }
  drawTicks() {
    push();
    translate(0, -this.margin);
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
      textAlign(CENTER, RIGHT);
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

  lines() {
    push();
    translate(0, -this.margin);
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[i].total / this.tickBar; j++) {
        stroke(199, 206, 211, 100);
        strokeWeight(2);
        line(
          this.tickBarIncrements * j,
          0,
          this.tickBarIncrements * j,
          -this.barHight
        );
      }
      translate(0, -this.barHight - this.spacing);
    }
    pop();
  }

  drawRects() {
    push();
    translate(0, -this.margin);
    for (let i = 0; i < this.data.length; i++) {
      let colorNumb = i % 4;
      fill(this.colors[colorNumb]);

      noStroke();
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
        //text(this.data[i].total, 0, 0);
        text(
          this.data[i].Total_Dwelling,
          this.scaleData(this.data[i].Total_Dwelling) + this.barValueMargin,
          // this.chartWidth,
          -this.completeSpacing * i - this.barHight / 2
        );
      }
    }
    pop();
  }
  textLabel() {
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
