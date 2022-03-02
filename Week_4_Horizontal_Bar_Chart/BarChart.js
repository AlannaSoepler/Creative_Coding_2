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
    _titleMargin,
    _tickMargin,
    _numTicks,
    _tickSize,
    _numPlaces,
    _bodyFontSize,
    _titleFontSize,
    _valueFontSize,
    _verticalAxisMargin,
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
    this.titleMargin = _titleMargin;
    this.tickMargin = _tickMargin;
    this.numTicks = _numTicks;
    this.tickSize = _tickSize;
    this.tickIncrements;
    this.numPlaces = _numPlaces;
    this.bodyFontSize = _bodyFontSize;
    this.titleFontSize = _titleFontSize;
    this.valueFontSize = _valueFontSize;
    this.verticalAxisMargin = _verticalAxisMargin;
    this.horizontalAxisMargin = _horizontalAxisMargin;

    this.showValues = true;
    this.showLabels = true;
    this.rotateLabels = false;

    this.colors = [
      //color('#29066b'),
      //color('#7d3ac1'),
      //color('#af4bce'),
      //color('#db4cb2'),
      color('#eb548c'),
      color('#ea7369'),
      color('#f0a58f'),
      color('#fceea6'),
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
    this.lines();
    this.textLabel();
    pop();
  }

  calculateMaxValue() {
    let listValues = this.data.map(function (x) {
      return x.total;
    });
    this.maxValue = max(listValues);
    this.tickIncrements = this.maxValue / this.numTicks;
  }

  //This function expects a parameter and scales it using the max value and chart hight
  scaleData(num) {
    return map(num, 0, this.maxValue, 0, this.chartHeight);
  }

  drawAxis() {
    stroke(255, 180);
    strokeWeight(2);
    line(0, 0, 0, -this.chartHeight); //y
    line(0, 0, this.chartWidth, 0); //x
  }

  drawTicks() {
    for (let i = 0; i <= this.numTicks; i++) {
      //numbers (text)
      fill(255, 200);
      noStroke();
      textSize(this.tickSize);
      textAlign(RIGHT, CENTER);
      text(
        (i * this.tickIncrements).toFixed(this.numPlaces),
        -this.tickMargin,
        this.tickSpacing * -i
      );
    }
  }

  drawHorizontalLine() {
    for (let i = 0; i <= this.numTicks; i++) {
      //ticks
      stroke(255, 100);
      strokeWeight(0.5);
      line(0, this.tickSpacing * -i, this.chartWidth, this.tickSpacing * -i);
    }
  }

  title() {
    noStroke();
    fill(255);
    textSize(this.titleFontSize);
    textAlign(CENTER);
    text(
      'Vertical Bar Chart',
      this.chartWidth / 2,
      -this.chartHeight - this.titleMargin
    );
  }

  verticalAxisTitle() {
    push();
    noStroke();
    fill(255);
    textSize(this.titleFontSize);
    textAlign(CENTER);
    rotate((3 * PI) / 2);
    text('Amount', this.chartHeight / 2, -this.verticalAxisMargin);
    pop();
  }

  horizontalAxisTitle() {
    noStroke();
    fill(255);
    textSize(this.titleFontSize);
    textAlign(CENTER);
    text('Frout', this.chartWidth / 2, this.horizontalAxisMargin);
  }

  lines() {
    push();
    translate(this.margin, 0);
    this.barValue();
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < (this.data[i].total / 10) * 0.5; j++) {
        fill(255, 200);
        stroke(255, 200);
        strokeWeight(2);
        line(0, this.tickSpacing * -j, this.barWidth, this.tickSpacing * -j);
      }
      translate(this.barWidth + this.spacing, 0);
    }
    pop();
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
        this.scaleData(-this.data[i].total)
      );
    }
    this.barValue();
    //this.textLabel();
    pop();
  }

  barValue() {
    for (let i = 0; i < this.data.length; i++) {
      if (this.showValues) {
        noStroke();
        fill(255);
        textSize(this.valueFontSize);
        textAlign(CENTER, BOTTOM);
        text(
          this.data[i].total,
          (this.barWidth + this.spacing) * i + this.barWidth / 2,
          this.scaleData(-this.data[i].total)
        );
      }
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
          fill(255);
          textSize(this.bodyFontSize);
          textAlign(LEFT, CENTER);
          translate((this.barWidth + this.spacing) * i + this.barWidth / 2, 10);
          rotate(PI / 2);
          text(this.data[i].name, 0, 0);
          pop();
        } else {
          noStroke();
          fill(255);
          textSize(this.bodyFontSize);
          textAlign(CENTER, BOTTOM);
          text(
            this.data[i].name,
            (this.barWidth + this.spacing) * i + this.barWidth / 2,
            this.labelMargin
          );
        }
      }
    }
    pop();
  }
}
