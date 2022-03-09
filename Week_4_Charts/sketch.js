//A
let chart01;
let chart02;
let chart03;
let chart04;
let chart05;
//Fill the object with these values.
let params = {
  font: 12,
  title: true,
  vTitle: true,
  hTitle: true,
  value: true,
  label: true,
  hline: true,
};

var gui;

function setup() {
  createCanvas(2000, 2500);
  generateData();
  textFont(bodyFont);

  chart01 = new BarChart(data02);
  chart01.chartWidth = 600;
  chart01.chartHeight = 400;
  chart01.pos.posX = 150;
  chart01.pos.posY = 1900;
  chart01.spacing = 10;
  chart01.margin = 20;
  chart01.labelMargin = 20;
  chart01.barValueMargin = 10;
  chart01.titleMargin = 50;
  chart01.numTicks = 5;
  chart01.tickMargin = 20;
  chart01.tickSize = 16;
  chart01.rounding = 10000;
  chart01.titleText = 'Total Dwellings';
  chart01.numDecimals = 0;
  chart01.bodyFontSize = 18;
  chart01.titleFontSize = 20;
  chart01.verticalAxisTitleText = 'Amount Of Permissions';
  chart01.verticalAxisMargin = 90;
  chart01.horizontalAxisTitleText = 'Yearly Quatres';
  chart01.horizontalAxisMargin = 90;
  chart01.horizontalFontSize = 18;
  chart01.verticalFontSize = 18;

  chart02 = new HorizontalBarChart(data02);
  chart02.chartWidth = 600;
  chart02.chartHeight = 400;
  chart02.pos.posX = 1200;
  chart02.pos.posY = 550;
  chart02.spacing = 10;
  chart02.rounding = 1000;
  chart02.margin = 20;
  chart02.labelMargin = 40;
  chart02.barValueMargin = 20;
  chart02.titleMargin = 50;
  chart02.numTicks = 5;
  chart02.tickMargin = 60;
  chart02.tickSize = 16;
  chart02.titleText = 'Number Of Dwellings';
  chart02.numDecimals = 0;
  chart02.bodyFontSize = 16;
  chart02.titleFontSize = 20;
  chart02.verticalAxisTitleText = 'Yearly Quatres';
  chart02.verticalAxisMargin = 90;
  chart02.horizontalAxisTitleText = 'Amount of Permissions';
  chart02.horizontalAxisMargin = 60;
  chart02.horizontalFontSize = 18;
  chart02.verticalFontSize = 18;

  chart03 = new StackedBarChart(data02);
  chart03.chartWidth = 600;
  chart03.chartHeight = 400;
  chart03.pos.posX = 150;
  chart03.pos.posY = 1200;
  chart03.spacing = 2;
  chart03.margin = 20;
  chart03.rounding = 1000;
  chart03.labelMargin = 10;
  chart03.barValueMargin = 10;
  chart03.titleMargin = 50;
  chart03.numTicks = 5;
  chart03.tickMargin = 30;
  chart03.tickSize = 16;
  chart03.titleText = 'Dwelling Units Approved By Type';
  chart03.numDecimals = 0;
  chart03.bodyFontSize = 16;
  chart03.titleFontSize = 20;
  chart03.legendFontSize = 16;
  chart03.verticalAxisTitleText = 'Amount Of Permissions';
  chart03.verticalAxisMargin = 90;
  chart03.horizontalAxisTitleText = 'Yearly Quatres';
  chart03.horizontalAxisMargin = 90;
  chart03.horizontalFontSize = 18;
  chart03.verticalFontSize = 18;
  chart03.legendTitle01 = 'Multi Development Housing';
  chart03.legendTitle02 = 'One Off Housing';
  chart03.legendTitle03 = 'Apartments';
  chart03.rounding = 1000;
  chart03.rectSize = 10;
  chart03.legendMargin = 50;
  chart03.legendSpacing = 20;
  chart03.rectLegendMargin = 35;

  chart04 = new HundredStackedBarChart(data02);
  chart04.chartWidth = 600;
  chart04.chartHeight = 400;
  chart04.pos.posX = 1200;
  chart04.pos.posY = 1200;
  chart04.spacing = 2;
  chart04.margin = 20;
  chart04.rounding = 1000;
  chart04.labelMargin = 10;
  chart04.barValueMargin = 10;
  chart04.titleMargin = 50;
  chart04.numTicks = 5;
  chart04.tickMargin = 30;
  chart04.tickSize = 18;
  chart04.titleText = 'Split Between Houses And Apartment Permissions';
  chart04.numDecimals = 0;
  chart04.bodyFontSize = 18;
  chart04.titleFontSize = 20;
  chart04.verticalFontSize = 18;
  chart04.horizontalFontSize = 18;
  chart04.verticalAxisTitleText = 'Amount Of Permissions';
  chart04.verticalAxisMargin = 80;
  chart04.horizontalAxisTitleText = 'Yearly Quatres';
  chart04.horizontalAxisMargin = 80;
  chart04.legendTitle01 = 'Housing';
  chart04.legendTitle02 = 'Apartments';
  chart04.rounding = 1000;
  chart04.rectSize = 15;
  chart04.legendMargin = 50;
  chart04.legendSpacing = 20;
  chart04.rectLegendMargin = 35;

  chart05 = new LineChart(data02);
  chart05.chartWidth = 600;
  chart05.chartHeight = 300;
  chart05.pos.posX = 150;
  chart05.pos.posY = 450;
  chart05.spacing = 20;
  chart05.margin = 30;
  chart05.rounding = 1000;
  chart05.labelMargin = 10;
  chart05.titleMargin = 50;
  chart05.numTicks = 5;
  chart05.tickMargin = 30;
  chart05.tickSize = 16;
  chart05.titleText = 'Dwelling Units Granted Planning Permission';
  chart05.numDecimals = 0;
  chart05.bodyFontSize = 16;
  chart05.legendFontSize = 16;
  chart05.titleFontSize = 20;
  chart05.horizontalFontSize = 18;
  chart05.verticalFontSize = 18;
  chart05.verticalAxisTitleText = 'Amount Of Permissions';
  chart05.verticalAxisMargin = 90;
  chart05.horizontalAxisTitleText = 'Yearly Quatres';
  chart05.horizontalAxisMargin = 80;
  chart05.legendTitle01 = 'Houses';
  chart05.legendTitle02 = 'Apartments';
  chart05.rounding = 1000;
  chart05.rectSize = 10;
  chart05.legendMargin = 50;
  chart05.legendSpacing = 20;
  chart05.rectLegendMargin = 35;
  chart05.ellipseSize = 5;

  gui = createGui('Change the number of bars');
  gui.addObject(params);
}

function draw() {
  background(93, 114, 127);
  chart01.updateValues();
  chart01.calculateMaxValue();
  chart01.render();
  chart01.updateGuiVals(
    params.font,
    params.title,
    params.vTitle,
    params.hTitle,
    params.value,
    params.label,
    params.hline
  );
  chart02.updateValues();
  chart02.calculateMaxValue();
  chart02.render();
  chart02.updateGuiVals(
    params.font,
    params.title,
    params.vTitle,
    params.hTitle,
    params.value,
    params.label,
    params.hline
  );
  chart03.updateValues();
  chart03.calculateMaxValue();
  chart03.render();
  chart03.updateGuiVals(params.font);
  chart04.calculateMaxValue();
  chart04.updateValues();
  chart04.render();
  chart04.updateGuiVals(params.font);
  chart05.calculateMaxValue();
  chart05.updateValues();
  chart05.render();
}
