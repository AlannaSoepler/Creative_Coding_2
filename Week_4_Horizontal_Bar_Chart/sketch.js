//Array of objects
let data = [
  { name: 'Oranges', total: 100 },
  { name: 'Bananas', total: 33 },
  { name: 'Pears', total: 7 },
  { name: 'Apples', total: 43 },
];

let chart01;
let chart02;

function setup() {
  createCanvas(800, 800);

  chart01 = new BarChart(data);
  chart01.chartWidth = 200;
  chart01.chartHeight = 200;
  chart01.posX = 50;
  chart01.posY = 500;
  chart01.updateValues();

  chart02 = new BarChart02(data);
  chart02.chartWidth = 200;
  chart02.chartHeight = 200;
  chart02.posX = 400;
  chart02.posY = 500;
  chart02.updateValues();
}

function draw() {
  background(50);
  chart01.updateValues();
  chart01.render();
  chart02.updateValues();
  chart02.render();
}
