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

//this is an array function. It is NOT the same as the map function used further down
let listValues = data.map(function (x) {
  return x.total;
});

let scaledData = [];
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
let colors;

let tickSpacing = chartHeight / numTicks; //space between ticks on  the left
let availableWidth = chartWidth - margin * 2 - spacing * (data.length - 1); //available space for bars
let barWidth = availableWidth / data.length; //bar width

function setup() {
  createCanvas(500, 500);
  background(0);

  colors = [
    color('#ffe066'),
    color('#fab666'),
    color('#f68f6a'),
    color('#f3646a'),
  ];
  maxValue = max(listValues);
  tickIncrements = maxValue / numTicks;

  for (let i = 0; i < data.length; i++) {
    let tempVal = map(data[i].total, 0, maxValue, 0, chartHeight);
    scaledData.push(tempVal);
  }
}

function draw() {
  background(0);

  translate(posX, posY);
  //chart
  stroke(255, 180);
  strokeWeight(1);
  line(0, 0, 0, -chartHeight); //y
  line(0, 0, chartWidth, 0); //x

  for (let i = 0; i <= numTicks; i++) {
    //ticks
    stroke(255, 100);
    line(0, tickSpacing * -i, -10, tickSpacing * -i);

    //ticks
    stroke(255, 100);
    line(0, tickSpacing * -i, chartWidth, tickSpacing * -i);

    //numbers (text)
    fill(255, 200);
    noStroke();
    textSize(11);
    textAlign(RIGHT, CENTER);
    text((i * tickIncrements).toFixed(numPlaces), -15, tickSpacing * -i);
  }

  translate(margin, 0);
  for (let i = 0; i < scaledData.length; i++) {
    //Modules is the remainder.
    //It will iterate though the colors and start from the beginning
    let colorNumb = i % 4;

    //bars
    fill(colors[colorNumb]);
    noStroke();
    rect((barWidth + spacing) * i, 0, barWidth, -scaledData[i]);

    //Bar Value
    if (showValues) {
      noStroke();
      fill(255);
      textSize(16);
      textAlign(CENTER, BOTTOM);
      text(
        data[i].total,
        (barWidth + spacing) * i + barWidth / 2,
        -scaledData[i]
      );
    }

    //Bar Label
    if (showLabels) {
      if (rotateLabels) {
        push();
        noStroke();
        fill(255);
        textSize(16);
        textAlign(LEFT, CENTER);
        translate((barWidth + spacing) * i + barWidth / 2, 10);
        rotate(PI / 2);
        text(data[i].name, 0, 0);
        pop();
      } else {
        noStroke();
        fill(255);
        textSize(14);
        textAlign(CENTER, BOTTOM);
        text(data[i].name, (barWidth + spacing) * i + barWidth / 2, 20);
      }
    }
  }
}
