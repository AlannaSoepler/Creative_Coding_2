//Array of objects
let data = [
  {
    name: 'Oranges',
    total: 100,
    values: [
      { category: 'USA', value: 25 },
      { category: 'UK', value: 25 },
      { category: 'Ireland', value: 25 },
      { category: 'Norway', value: 25 },
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

function setup() {
  createCanvas(1200, 800);
  generateData();
  textFont(bodyFont);

  chart01 = new BarChart(data02);
  chart01.chartWidth = 400;
  chart01.chartHeight = 400;
  chart01.pos.posX = 900;
  chart01.pos.posY = 1300;
  chart01.spacing = 5;
  chart01.margin = 20;
  chart01.labelMargin = 20;
  chart01.barValueMargin = 10;
  chart01.titleMargin = 50;
  chart01.numTicks = 10;
  chart01.tickMargin = 20;
  chart01.tickSize = 18;
  chart01.titleText = 'Total Dwellings';
  chart01.tickBar = 10;
  chart01.numDecimals = 0;
  chart01.bodyFontSize = 18;
  chart01.titleFontSize = 34;
  chart01.valueFontSize = 24;
  chart01.verticalAxisTitleText = 'Amount';
  chart01.verticalAxisMargin = 80;
  chart01.horizontalAxisTitleText = 'Categories';
  chart01.horizontalAxisMargin = 80;

  chart02 = new HorizontalBarChart(data02);
  chart02.chartWidth = 400;
  chart02.chartHeight = 400;
  chart02.pos.posX = 900;
  chart02.pos.posY = 550;
  chart02.spacing = 10;
  chart02.rounding = 1000;
  chart02.margin = 20;
  chart02.labelMargin = 40;
  chart02.barValueMargin = 20;
  chart02.titleMargin = 50;
  chart02.numTicks = 5;
  chart02.tickMargin = 60;
  chart02.tickSize = 18;
  chart02.titleText = 'Vertical Bar Chart';
  chart02.tickBar = 10;
  chart02.numDecimals = 0;
  chart02.bodyFontSize = 18;
  chart02.titleFontSize = 34;
  chart02.valueFontSize = 16;
  chart02.verticalAxisTitleText = 'Amount';
  chart02.verticalAxisMargin = 80;
  chart02.horizontalAxisTitleText = 'Categories';
  chart02.horizontalAxisMargin = 80;
  chart02.updateValues();

  chart03 = new StackedBarChart(data02);
  chart03.chartWidth = 400;
  chart03.chartHeight = 400;
  chart03.pos.posX = 1650;
  chart03.pos.posY = 550;
  chart03.spacing = 10;
  chart03.margin = 20;
  chart03.rounding = 1000;
  chart03.labelMargin = 10;
  chart03.barValueMargin = 10;
  chart03.titleMargin = 50;
  chart03.numTicks = 10;
  chart03.tickMargin = 30;
  chart03.tickSize = 18;
  chart03.titleText = 'Vertical Bar Chart';
  chart03.tickBar = 10;
  chart03.numDecimals = 0;
  chart03.bodyFontSize = 18;
  chart03.titleFontSize = 34;
  chart03.valueFontSize = 24;
  chart03.verticalAxisTitleText = 'Amount';
  chart03.verticalAxisMargin = 80;
  chart03.horizontalAxisTitleText = 'Categories';
  chart03.horizontalAxisMargin = 80;
  chart03.legendTitle01 = 'Multi Development Housing';
  chart03.legendTitle02 = 'One Off Housing';
  chart03.legendTitle03 = 'Apartments';
  chart03.rounding = 1000;
  chart03.rectSize = 15;
  chart03.legendMargin = 50;
  chart03.legendSpacing = 50;
  chart03.rectLegendMargin = 35;
  chart03.updateValues();

  chart04 = new HundredStackedBarChart(data02);
  chart04.chartWidth = 400;
  chart04.chartHeight = 400;
  chart04.pos.posX = 150;
  chart04.pos.posY = 1300;
  chart04.spacing = 10;
  chart04.margin = 20;
  chart04.rounding = 1000;
  chart04.labelMargin = 10;
  chart04.barValueMargin = 10;
  chart04.titleMargin = 50;
  chart04.numTicks = 10;
  chart04.tickMargin = 30;
  chart04.tickSize = 18;
  chart04.titleText = 'Vertical Bar Chart';
  chart04.tickBar = 10;
  chart04.numDecimals = 0;
  chart04.bodyFontSize = 18;
  chart04.titleFontSize = 34;
  chart04.valueFontSize = 24;
  chart04.verticalAxisTitleText = 'Amount';
  chart04.verticalAxisMargin = 80;
  chart04.horizontalAxisTitleText = 'Categories';
  chart04.horizontalAxisMargin = 80;
  chart04.legendTitle01 = 'Multi Development Housing';
  chart04.legendTitle02 = 'One Off Housing';
  chart04.legendTitle03 = 'Apartments';
  chart04.rounding = 1000;
  chart04.rectSize = 15;
  chart04.legendMargin = 50;
  chart04.legendSpacing = 50;
  chart04.rectLegendMargin = 35;
  chart04.updateValues();

  chart05 = new LineChart(data02);
  chart05.chartWidth = 400;
  chart05.chartHeight = 400;
  chart05.pos.posX = 150;
  chart05.pos.posY = 550;
  chart05.spacing = 10;
  chart05.margin = 20;
  chart05.rounding = 1000;
  chart05.labelMargin = 10;
  chart05.barValueMargin = 10;
  chart05.titleMargin = 50;
  chart05.numTicks = 10;
  chart05.tickMargin = 30;
  chart05.tickSize = 18;
  chart05.titleText = 'Vertical Bar Chart';
  chart05.tickBar = 10;
  chart05.numDecimals = 0;
  chart05.bodyFontSize = 18;
  chart05.titleFontSize = 34;
  chart05.valueFontSize = 24;
  chart05.verticalAxisTitleText = 'Amount';
  chart05.verticalAxisMargin = 80;
  chart05.horizontalAxisTitleText = 'Categories';
  chart05.horizontalAxisMargin = 80;
  chart05.legendTitle01 = 'Multi Development Housing';
  chart05.legendTitle02 = 'One Off Housing';
  chart05.legendTitle03 = 'Apartments';
  chart05.rounding = 1000;
  chart05.rectSize = 15;
  chart05.legendMargin = 50;
  chart05.legendSpacing = 50;
  chart05.rectLegendMargin = 35;
  chart05.ellipseSize = 5;
  chart05.updateValues();
}

function draw() {
  background(93, 114, 127);
  scale(0.5);
  chart01.updateValues();
  chart01.calculateMaxValue();
  chart01.render();
  chart02.updateValues();
  chart02.calculateMaxValue();
  chart02.render();
  chart03.updateValues();
  chart03.calculateMaxValue();
  chart03.render();
  chart04.calculateMaxValue();
  chart04.updateValues();
  chart04.render();
  chart05.calculateMaxValue();
  chart05.updateValues();
  chart05.render();
}
