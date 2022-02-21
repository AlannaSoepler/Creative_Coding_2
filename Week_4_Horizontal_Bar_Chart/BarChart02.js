class BarChart02 {
  constructor(_data) {
    this.data = _data;
    this.chartWidth = 400;
    this.chartHeight = 400;
    this.spacing = 10;
    this.margin = 20;
    this.numTicks = 10;
    this.sizeTicks = 10;
    this.textPlace = 25;
    this.barValueSpacing = 10;
    this.posX = 150;
    this.posY = 450;
    this.colors;
    this.numPlaces = 0;
    this.incrementTick;
    this.maxVal;

    this.showValues = true;
    this.showLabels = true;
    this.rotateLabels = false;

    this.colors = [
      color('#ffe066'),
      color('#fab666'),
      color('#f68f6a'),
      color('#f3646a'),
    ];
    this.updateValues();
    this.calculateMaxValue();
  }
  updateValues() {
    this.tickSpacing = this.chartWidth / this.numTicks; //space between ticks on  the left
    this.availableHight =
      this.chartWidth - 2 * this.margin - (this.data.length - 1) * this.spacing; //available space for bars
    this.barHight = this.availableHight / this.data.length; //bar width
    this.completeSpacing = this.barHight + this.spacing;
  }
  calculateMaxValue() {
    let listValues = this.data.map(function (x) {
      return x.total;
    });
    this.maxVal = max(listValues);
    this.incrementTick = Math.round(this.maxVal / this.numTicks);
  }
  render() {
    push();
    translate(this.posX, this.posY);
    this.drawAxis();
    this.drawTicks();
    // this.drawHorizontalLine();
    this.drawRects();
    pop();
  }
  scaleData(num) {
    return map(num, 0, this.maxVal, 0, this.chartHeight);
  }
  drawAxis() {
    stroke(255, 0, 0, 200);
    strokeWeight(2);
    line(0, 0, 0, -this.chartHeight);
    line(0, 0, this.chartWidth, 0);
  }
  drawTicks() {
    for (let i = 0; i < this.numTicks; i++) {
      let drawTick = this.chartWidth / this.numTicks;
      //Draw the tick value
      fill(255);
      noStroke();
      textSize(12);
      textAlign(CENTER);
      text(this.incrementTick * i, drawTick * i, this.textPlace);

      stroke(255, 200);
      line(this.tickSpacing * i, 0, this.tickSpacing * i, this.sizeTicks);

      stroke(255, 50);
      line(
        this.tickSpacing * i,
        -this.chartHeight,
        this.tickSpacing * i,
        this.sizeTicks
      );
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
        textSize(16);
        textAlign(LEFT, CENTER);
        text(
          this.data[i].total,
          this.scaleData(this.data[i].total) + this.barValueSpacing,
          -this.completeSpacing * i - this.barHight / 2
        );
      }

      if (this.showLabels) {
        if (this.otateLabels) {
          push();
          noStroke();
          fill(255);
          textSize(16);
          textAlign(RIGHT, CENTER);
          translate(
            -this.barValueSpacing,
            -this.completeSpacing * i - this.barHight / 2
          );
          rotate(PI / 2);
          text(this.data[i].name, 0, 0);
          pop();
        } else {
          noStroke();
          fill(255);
          textSize(16);
          textAlign(RIGHT, BOTTOM);
          text(
            this.data[i].name,
            -this.barValueSpacing,
            -this.completeSpacing * i - this.barHight / 2
          );
        }
      }
    }
  }
}
