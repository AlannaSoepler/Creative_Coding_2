/*Terminology for CC Part 2
declaring a variable ny the name distance
using the assignment operator to assign a value to the variable 
Boolean = true/false, string = "Alanna", int = 9, float = 1.5, array = [], Object {}
Handle encapsulation array [], Object {} */
let distance;
String = 'Alanna';
Float = 1.5;

//Declaring a variable by the name distance and assigning the value of 23 to it
let distance = 23;
//Calling the Variable ?
distance;
//Calling a function or function call
doSomething();
//Declaring function
function doSomething() {}
//The purpose of a function
//It is repeatable code
//Easier to find errors

//Parameter is something you pass to the function
rect(12, 23, 12, 56);
//If not parameter i would have to call the function 4 times
rect();
rect();
rect();
rect();
//a function with a parameter
clap(3, 8);
function clap(startNum, endNum) {
  let loopCount = endNum - startNum;
  for (let i = 0; i <= loopCount; i++) {
    console.log('Hi' + (startNum + i));
  }
}

//working function
clap(3, 8);

function clap(startNum, endNum) {
  //code after this is called a statement
  let loopCount = endNum - startNum;
  for (let i = 0; i <= loopCount; i++) {
    console.log('Hi' + (startNum + i));
  }
  return 'Done';
}

function addMeUp(num01, num02) {
  //A line of code is called an statement
  //the code after the assignment operator is called an expression
  let sum = num01 + num02;
  return sum;
}

//if statement = conditional statement
// == comparison operator
if (clap == 34) {
  console.log('hi');
}

//function must have a name, declared, code and return
