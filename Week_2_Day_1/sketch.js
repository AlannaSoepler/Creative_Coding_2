//Test
let chartWidth = 400;
let chartHeight = 400;
let data = [250,100,50];
let spacing = 10;
let margin = 20;
let avalableWidth = chartWidth-(2*margin)-((data.length-1)*spacing);
let barWidth = avalableWidth / data.length;
let numTick = 10;
let tickSize = -10;
let textPlace = -15;
let drawTick = chartHeight / numTick;
let drawText = chartHeight / numTick;

console.log(barWidth);
console.log(drawTick);

function setup(){
    createCanvas(500,500);
    background(0);
}

function draw(){
    background(0);

    translate(50, 450);
    stroke(255,200);
    strokeWeight(2);
    line(0,0,0,-400);
    line(0,0,400,0);
    
    for(let i = 0; i <= numTick; i++){
        //Draw the tick value
        fill(255,0,0);
        noStroke();
        textSize(12);
        textAlign(RIGHT,CENTER);
        text(i*40,textPlace,-drawText*i);
        //Drawing the ticks
        stroke(255,200);
        strokeWeight(2);
        line(0,-drawTick*i,tickSize,-drawTick*i);
    }

    translate(margin,0);

    

    for(let i = 0; i <= data.length; i++){
        noStroke();
        fill(0,150,0);
        barWidthAll = barWidth+spacing;
        rect(barWidthAll*i, 0, barWidth, -data[i]);
    }
}


