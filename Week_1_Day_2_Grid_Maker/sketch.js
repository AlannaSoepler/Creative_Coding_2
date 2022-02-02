//Test
let screenWidth = 500;
let screenHeight = 500;
let numBoxes = 10; 
let rVal = 0;

function setup(){
    createCanvas(screenWidth, screenHeight);
    background(0);
    angleMode(DEGREES);
    rectMode(CENTER);
}

function draw(){
    background(0);
    boxGrid(50,color('blue'),1);
    boxGrid(10,color('red'),2);
    push();

    //rotating the coardnate system not the rectangle
    translate(screenWidth/2,screenHeight/2);
    fill(150,0,0);
    rotate(rVal++);
    rect(0,0,100,100);
    pop();
    
    
}


