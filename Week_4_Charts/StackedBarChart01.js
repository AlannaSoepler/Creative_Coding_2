class StackedBarChart {
  constructor(_data, _posX, _posY) {
    this.data = _data;
    this.chartWidth = 400;
    this.chartHeight = 400;
    //this.listValues = data.map(function (x) {return x.total;});
    this.spacing = 10;
    this.margin = 20;
    this.numTicks = 10;
    this.pos = createVector(_posX, _posY);
    this.tickIncrements;
    this.maxValue;
    this.numPlaces = 0;

    this.showValues = true;
    this.showLabels = true;
    this.rotateLabels = false;
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
    this.lines();
    this.textLabel();
    this.barValue();
    //this.legend();
    this.drawAvg();
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
    stroke(199, 206, 211, 180);
    strokeWeight(1);
    line(0, 0, 0, -this.chartHeight); //y
    line(0, 0, this.chartWidth, 0); //x
  }

  drawTicks() {
    for (let i = 0; i <= this.numTicks; i++) {
      fill(199, 206, 211, 200);
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

  lines() {
    push();
    translate(this.margin, 0);
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[i].total / this.tickBar; j++) {
        stroke(199, 206, 211, 100);
        strokeWeight(2);
        line(
          0,
          this.tickBarIncrements * -j,
          this.barWidth,
          this.tickBarIncrements * -j
        );
      }
      translate(this.barWidth + this.spacing, 0);
    }
    pop();
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
      for (let j = 0; j < this.data[i].values.length; j++) {
        let colorNumb = j % 4;

        fill(this.colors[colorNumb]);

        rect(
          (this.barWidth + this.spacing) * i,
          0,
          this.barWidth,
          this.scaleData(-this.data[i].values[j].value)
        );
        translate(0, this.scaleData(-this.data[i].values[j].value));
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
        fill(199, 206, 211);
        textSize(this.valueFontSize);
        textAlign(CENTER, BOTTOM);
        text(
          this.data[i].total,
          (this.barWidth + this.spacing) * i + this.barWidth / 2,
          this.scaleData(-this.data[i].total) - this.barValueMargin
        );
      }
    }
    pop();
  }

  legend() {
    push();
    translate(this.margin, 0);
    for (let i = 0; i < this.data.length; i++) {
      noStroke();
      fill(199, 206, 211);
      textSize(this.valueFontSize);
      textAlign(CENTER, CENTER);
      text(
        this.data[i].name,
        (this.barWidth + this.spacing) * i + this.barWidth / 2,
        -this.chartHeight / 2
      );
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
          text(this.data[i].name, 0, 0);
          pop();
        } else {
          noStroke();
          fill(199, 206, 211);
          textSize(this.bodyFontSize);
          textAlign(CENTER, TOP);
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
