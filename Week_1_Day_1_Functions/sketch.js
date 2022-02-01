//working function
clap(3,8);

function clap(startNum,endNum){
    let loopCount = endNum-startNum;
    for(let i = 0; i <= loopCount; i++){
        console.log("Hi"+startNum+i);
    }    
}