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
  },
];

let chart01;
let chart02;
let chart03;

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

  chart03 = new BarChart03(data);
  chart03.chartWidth = 200;
  chart03.chartHeight = 200;
  chart03.posX = 400;
  chart03.posY = 800;
  chart03.updateValues();
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
}
