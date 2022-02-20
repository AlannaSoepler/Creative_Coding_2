let chartWidth = 400;
let chartHeight = 400;

//Array of objects
let data = [
  { name: 'Oranges', total: 63 },
  { name: 'Bananas', total: 33 },
  { name: 'Pears', total: 7 },
  { name: 'Apples', total: 43 },
];

let dataValues = [
  { name: 'Oranges', total: 63 },
  { name: 'Bananas', total: 33 },
  { name: 'Pears', total: 7 },
  { name: 'Apples', total: 43 },
];

let listValues = data.map(function (x) {
  return x.total;
});

let numPlaces;
let maxValue;
let posX = 50;
let posY = 450;
let spacing = 10;
let margin = 20;
let numTicks = 10;
let tickIncrements;
let showValues = true;
let showLabels = true;
let rotateLabels = true;
let showTicks = true;
let colors;

let tickSpacing = chartHeight / numTicks; //space between ticks on  the left
let availableWidth = chartWidth - margin * 2 - spacing * (data.length - 1); //available space for bars
let barWidth = availableWidth / data.length; //bar width

let chart01;

function setup() {
  createCanvas(800, 800);

  chart01 = new BarChart(data);
  chart01.chartWidth = 200;
  chart01.chartHeight = 200;
  chart01.posX = 50;
  chart01.posY = 700;
  chart01.updateValues();
}

function draw() {
  background(50);
  chart01.render();
}
