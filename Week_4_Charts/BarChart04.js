class BarChart04 {
  constructor(_data, _chartWidth, _chartHeight) {
    this.data = _data;
    this.chartWidth = _chartWidth;
    this.chartHeight = _chartHeight;
    //this.listValues = data.map(function (x) {return x.total;});
    this.spacing = 10;
    this.margin = 20;
    this.numTicks = 10;
    this.posX = 50;
    this.posY = 450;
    this.tickIncrements;
    this.maxValue;
    this.numPlaces = 0;

    this.showValues = true;
    this.showLabels = true;
    this.rotateLabels = true;

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
  data() {
    for (let i = 0; i <= this.data.length; i++) {}
  }

  render() {
    push();
    translate(this.posX, this.posY);
    this.drawAxis();
    this.drawTicks();
    this.drawHorizontalLine();
    this.drawRects();
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
  scaleData(num, total) {
    return map(num, 0, total, 0, this.chartHeight);
  }

  drawAxis() {
    stroke(255, 180);
    strokeWeight(1);
    line(0, 0, 0, -this.chartHeight); //y
    line(0, 0, this.chartWidth, 0); //x
  }

  drawTicks() {
    for (let i = 0; i <= this.numTicks; i++) {
      //ticks
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

  drawHorizontalLine() {
    for (let i = 0; i <= this.numTicks; i++) {
      //ticks
      stroke(255, 100);
      line(0, this.tickSpacing * -i, this.chartWidth, this.tickSpacing * -i);
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
          this.scaleData(-this.data[i].values[j].value, this.data[i].total)
        );
        translate(
          0,
          this.scaleData(-this.data[i].values[j].value, this.data[i].total)
        );
      }
      pop();
      //Bar Label
      if (this.showLabels) {
        if (this.rotateLabels) {
          push();
          noStroke();
          fill(255);
          textSize(16);
          textAlign(LEFT, CENTER);
          translate((this.barWidth + this.spacing) * i + this.barWidth / 2, 10);
          rotate(PI / 2);
          text(this.data[i].name, 0, 0);
          pop();
        } else {
          noStroke();
          fill(255);
          textSize(14);
          textAlign(CENTER, BOTTOM);
          text(
            this.data[i].name,
            (this.barWidth + this.spacing) * i + this.barWidth / 2,
            20
          );
        }
      }
    }
    pop();
  }
}
