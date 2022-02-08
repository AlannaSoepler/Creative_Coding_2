//working function
let boxWidth = 20;
let boxHeight = 20;
let spacing = 5;
let xOffset = 10;
let yOffset = 10;
let totalSpace = boxWidth + spacing;
let xb = 10;
let yb = 10;
//let numBoxes = 10;

function setup() {
  createCanvas(500, 500);
  background(0);
}

function draw() {
  drawBoxes(xb, yb);
}

function drawBoxes(xBoxes, yBoxes) {
  fill(50);
  noStroke();
  for (let i = 0; i <= xBoxes; i++) {
    for (let y = 0; y <= yBoxes; y++) {
      //First round x pos = 0, for the first box, and the y pos for box 1 is 10,35...
      //After that i increases by 1.
      rect(
        i * totalSpace + xOffset,
        y * totalSpace + yOffset,
        boxWidth,
        boxHeight
      );
    }
  }
}

function clap(startNum, endNum) {
  let loopCount = endNum - startNum;
  for (let i = 0; i <= loopCount; i++) {
    console.log('Hi' + (startNum + i));
  }
  return 'Done';
}

function addMeUp(num01, num02) {
  let sum = num01 + num02;
  return sum;
}
//End of class
