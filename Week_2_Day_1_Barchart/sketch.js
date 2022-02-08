//Variables
let chartWidth = 400;
let chartHeight = 400;
let spacing = 10;
let margin = 20;
let numTick = 10;
let sizeTick = -10;
let textPlace = -15;
let barValueSpacing = 20;

//Array
let data = [250, 100, 50];

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
}

function draw() {
  background(0);

  translate(50, 450);
  stroke(255, 200);
  strokeWeight(2);
  line(0, 0, 0, -400);
  line(0, 0, 400, 0);

  for (let i = 0; i <= numTick; i++) {
    //Draw the tick value
    fill(255);
    noStroke();
    textSize(12);
    textAlign(RIGHT, CENTER);
    text(i * 40, textPlace, -drawText * i);

    //Drawing the ticks
    stroke(255, 200);
    strokeWeight(2);
    line(0, -drawTick * i, sizeTick, -drawTick * i);
  }

  translate(margin, 0);

  for (let i = 0; i <= data.length; i++) {
    noStroke();

    //Bar value
    push();
    translate(halfBar, 0);
    fill(255);
    textSize(23);
    textAlign(CENTER);
    text(data[i], completeBarWidth * i, -data[i] - barValueSpacing);
    pop();

    //Draw the bar
    fill(0, 150, 0);
    rect(completeBarWidth * i, 0, barWidth, -data[i]);
  }
}
