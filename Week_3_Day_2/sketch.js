let chartWidth = 400;
let chartHeight = 400;

//These should be encapsulated
//let data = [30, 100, 90, 20, 180, 94];
//let dataLabels = ['Oranges', 'Bananas', 'Lemons', 'Limes', 'Apples', 'Grapes'];

//Array of objects
let data = [
  { name: 'Oranges', total: 63 },
  { name: 'Bananas', total: 33 },
  { name: 'Pears', total: 7 },
  { name: 'Apples', total: 43 },
];

//this is an array function/method. It is NOT the same as the map function used further down
let listValues = data.map(function (x) {
  return x.total;
});

//Deceleration of variables
//let scaledData = [];
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
  chart01.posX = 100;
  chart01.posY = 400;
  chart01.updateValues();
}

function draw() {
  background(50);
  chart01.render();
}
