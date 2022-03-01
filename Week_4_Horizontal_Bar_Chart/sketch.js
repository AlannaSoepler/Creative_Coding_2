//Array of objects
let data = [
  {
    name: 'Oranges',
    total: 100,
    values: [
      { category: 'USA', value: 25 },
      { category: 'UK', value: 50 },
      { category: 'Ireland', value: 20 },
      { category: 'Norway', value: 5 },
    ],
    average: 95,
  },
  {
    name: 'Bananas',
    total: 73,
    values: [
      { category: 'USA', value: 13 },
      { category: 'UK', value: 20 },
      { category: 'Ireland', value: 20 },
      { category: 'Norway', value: 20 },
    ],
    average: 65,
  },
  {
    name: 'Pears',
    total: 23,
    values: [
      { category: 'USA', value: 7 },
      { category: 'UK', value: 7 },
      { category: 'Ireland', value: 5 },
      { category: 'Norway', value: 4 },
    ],
    average: 5,
  },
  {
    name: 'Apples',
    total: 48,
    values: [
      { category: 'USA', value: 22 },
      { category: 'UK', value: 6 },
      { category: 'Ireland', value: 11 },
      { category: 'Norway', value: 9 },
    ],
    average: 25,
  },
];

let chart01;
let chart02;
let chart03;
let chart04;
let chart05;
let titleFont;
let bodyFont;

function preload() {
  titleFont = loadFont('assets/Merriweather-Regular.ttf');
  bodyFont = loadFont('assets/Roboto-Regular.ttf');
}

function setup() {
  createCanvas(800, 800);
  textFont(bodyFont);

  chart01 = new BarChart(data);
  chart01.chartWidth = 400;
  chart01.chartHeight = 400;
  chart01.pos.posX = 150;
  chart01.pos.posY = 550;
  chart01.spacing = 30;
  chart01.margin = 20;
  chart01.labelMargin = 30;
  chart01.titleMargin = 30;
  chart01.numTicks = 10;
  chart01.tickMargin = 30;
  chart01.tickSize = 15;
  chart01.numPlaces = 0;
  chart01.bodyFontSize = 18;
  chart01.titleFontSize = 24;
  chart01.valueFontSize = 18;
  chart01.verticalAxisMargin = 80;
  chart01.horizontalAxisMargin = 80;
  chart01.updateValues();

  chart02 = new BarChart02(data);
  chart02.chartWidth = 200;
  chart02.chartHeight = 200;
  chart02.posX = 700;
  chart02.posY = 350;
  chart02.updateValues();

  chart03 = new BarChart03(data);
  chart03.chartWidth = 200;
  chart03.chartHeight = 200;
  chart03.posX = 700;
  chart03.posY = 650;
  chart03.updateValues();

  chart04 = new BarChart04(data);
  chart04.chartWidth = 200;
  chart04.chartHeight = 200;
  chart04.posX = 150;
  chart04.posY = 900;
  chart04.updateValues();

  chart05 = new BarChart05(data);
  chart05.chartWidth = 200;
  chart05.chartHeight = 200;
  chart05.posX = 450;
  chart05.posY = 900;
  chart05.updateValues();
}

function draw() {
  background(50);
  scale(0.6);
  chart01.updateValues();
  chart01.render();
  chart02.updateValues();
  chart02.render();
  chart03.updateValues();
  chart03.render();
  chart04.updateValues();
  chart04.render();
  chart05.updateValues();
  chart05.render();
}
