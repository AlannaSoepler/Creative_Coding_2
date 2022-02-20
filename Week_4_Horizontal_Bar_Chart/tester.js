let chartWidth = 400;
let chartHeight = 400;
let spacing = 10;
let margin = 20;

//Array of objects
let barValue = [90, 150, 200];

//Expressions
//let tickSpacing = chartHeight / numTicks; //space between ticks on  the left
let availableHight = chartHeight - margin * 2 - spacing * (barValue.length - 1); //available space for bars
let barHight = availableHight / barValue.length; //bar width
let completeSpacing = barHight + spacing;

function setup() {
  createCanvas(700, 700);
  background(0);
}

function draw() {
  background(50);
  translate(50, 450);

  stroke(255, 0, 0, 200);
  strokeWeight(2);
  line(0, 0, 0, -chartHeight);
  line(0, 0, chartWidth, 0);

  
  rect(0, 0, 100, -100);
  //translate(0, margin);
  //   for (let i = 0; i < barValue.length; i++) {
  //     fill(255);
  //     rect(0, completeSpacing * i, barValue[i], barHight);
  //   }
}
