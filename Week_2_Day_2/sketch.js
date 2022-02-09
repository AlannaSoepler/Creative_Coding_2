//Variables
let chartWidth = 400;
let chartHeight = 400;
let spacing = 10;
let margin = 20;
let numTick = 10;
let sizeTick = -10;
let textPlace = -15;
let barValueSpacing = 20;
let incrementTick;

//Array
let data = [30, 90, 20];
let scaleData = [];
let dataLabel = ['Oranges', 'Apples', 'Bananas'];
let maxVal;

//Expression
let availableWidth = chartWidth - 2 * margin - (data.length - 1) * spacing;
let barWidth = availableWidth / data.length;
let completeBarWidth = barWidth + spacing;
let drawTick = chartHeight / numTick;
let drawText = chartHeight / numTick;
let halfBar = barWidth / 2;

function setup() {
  createCanvas(500, 500);
  background(0);
  maxVal = max(data);
  incrementTick = Math.round(maxVal / numTick);

  for (let i = 0; i < data.length; i++) {
    //Map gives a range
    let temp = map(data[i], 0, maxVal, 0, chartHeight);
    scaleData.push(temp);
  }
}

function draw() {
  background(0);

  translate(50, 450);
  stroke(255, 200);
  strokeWeight(2);
  line(0, 0, 0, -chartHeight);
  line(0, 0, chartWidth, 0);

  for (let i = 0; i <= numTick; i++) {
    //Draw the tick value
    fill(255);
    noStroke();
    textSize(12);
    textAlign(RIGHT, CENTER);
    text(incrementTick * i, textPlace, -drawText * i);

    //Drawing the ticks
    stroke(255, 200);
    strokeWeight(2);
    line(0, -drawTick * i, sizeTick, -drawTick * i);
  }

  translate(margin, 0);

  for (let i = 0; i <= scaleData.length; i++) {
    noStroke();

    //Bar value better Version
    fill(255);
    textSize(23);
    textAlign(CENTER, CENTER);
    text(
      data[i],
      (barWidth + spacing) * i + barWidth / 2,
      -scaleData[i] - barValueSpacing
    );

    fill(255);
    textSize(23);
    textAlign(CENTER, CENTER);
    text(
      dataLabel[i],
      (barWidth + spacing) * i + barWidth / 2,
      barValueSpacing
    );

    //Draw the bar
    fill(0, 150, 0);
    rect(completeBarWidth * i, 0, barWidth, -scaleData[i]);
  }
}
