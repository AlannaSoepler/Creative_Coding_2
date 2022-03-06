class BarChart02 {
  constructor(_data) {
    this.data = _data;
    this.chartWidth = 400;
    this.chartHeight = 400;
    this.posX = 150;
    this.posY = 450;
    this.margin = 20;
    this.spacing = 10;
    this.numTicks = 10;
    this.numDecimals = 0;
    this.sizeTicks = 10;
    this.marginTicks = 25;
    this.barLabelMargin = 10;
    this.barValueMargin = 10;
    this.bodyTextSize = 12;
    this.titleSize = 12;
    this.valueSize = 10;
    this.colors;

    this.incrementTick;
    this.maxVal;

    this.showValues = true;
    this.showLabels = true;
    this.rotateLabels = false;

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
    let listValues = this.data.map(function (x) {
      return x.total;
    });
    this.maxVal = max(listValues);
    this.incrementTick = this.maxVal / this.numTicks;
  }
  render() {
    push();
    translate(this.posX, this.posY);
    this.drawAxis();
    this.drawTicks();
    this.drawVerticalLine();
    this.drawRects();
    pop();
  }
  scaleData(num) {
    return map(num, 0, this.maxVal, 0, this.chartWidth);
  }
  drawAxis() {
    stroke(255, 200);
    strokeWeight(2);
    line(0, 0, 0, -this.chartHeight);
    line(0, 0, this.chartWidth, 0);
  }
  drawVerticalLine() {
    for (let i = 0; i <= this.numTicks; i++) {
      stroke(255, 50);
      line(
        this.tickSpacing * i,
        -this.chartHeight,
        this.tickSpacing * i,
        this.sizeTicks
      );
    }
  }
  drawTicks() {
    for (let i = 0; i <= this.numTicks; i++) {
      let drawTick = this.chartWidth / this.numTicks;
      //Draw the tick value
      fill(255);
      noStroke();
      textSize(this.valueSize);
      textAlign(CENTER);
      text(
        (this.incrementTick * i).toFixed(this.numDecimals),
        drawTick * i,
        this.marginTicks
      );

      stroke(255, 200);
      line(this.tickSpacing * i, 0, this.tickSpacing * i, this.sizeTicks);
    }
  }
  drawRects() {
    translate(0, -this.margin);
    for (let i = 0; i < this.data.length; i++) {
      let colorNumb = i % 4;

      fill(this.colors[colorNumb]);
      noStroke();
      rect(
        0,
        -this.completeSpacing * i,
        this.scaleData(this.data[i].total),
        -this.barHight
      );

      if (this.showValues) {
        noStroke();
        fill(255);
        textSize(this.valueSize);
        textAlign(LEFT, CENTER);
        text(
          this.data[i].total,
          this.scaleData(this.data[i].total) + this.barValueMargin,
          -this.completeSpacing * i - this.barHight / 2
        );
      }

      if (this.showLabels) {
        if (this.rotateLabels) {
          push();
          noStroke();
          fill(255);
          textSize(this.bodyTextSize);
          textAlign(CENTER);
          translate(
            -this.barLabelMargin,
            -this.completeSpacing * i - this.barHight / 2
          );
          rotate(PI / 2);
          text(this.data[i].name, 0, 0);
          pop();
        } else {
          noStroke();
          fill(255);
          textSize(this.bodyTextSize);
          textAlign(RIGHT, CENTER);
          text(
            this.data[i].name,
            -this.barLabelMargin,
            -this.completeSpacing * i - this.barHight / 2
          );
        }
      }
    }
  }
}
