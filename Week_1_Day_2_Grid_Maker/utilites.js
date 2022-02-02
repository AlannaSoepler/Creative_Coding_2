function boxGrid(num,setColor, strokeThickness){
    let boxSize = screenWidth / num;
    let offset = boxSize / 2;
    for(let i = 0; i < num; i++){
        for(let j = 0; j < num; j++){
            noFill();
            stroke(setColor);
            strokeWeight(strokeThickness)
            push();
            translate(i*boxSize+offset,j*boxSize+offset);
            rotate(45);
            rect(0,0,boxSize,boxSize);
            pop();
        }
    }
}