// const fs = require("fs");

// function afterFileIsRead(err,contents){
//     console.log(contents);
    
// }

// fs.readFile("C:/Users/abhis/Desktop/Cohort-HK/WEB-DEV+DEVOPS/week-4/a.txt","utf-8", afterFileIsRead) ; 
// console.log(contents);


// CALLING setTimeOut without  promises
function setTimeoutPromisified(ms) {

}
function callback() {
	console.log("HI there!");
}

setTimeout(callback , 5*1000)

let u=0;
for(let i=0; i<1000; i++){
    u = u +i;
}
console.log(u);


// output: 
// 499500 --->first
// HI there! --->then


// CALLING setTimeOut with promises

function setTimeoutPromisified(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function callback() {
	console.log("3 seconds have passed");
}

setTimeoutPromisified(3000).then(callback)


//without promises
function setTimeoutPromisified(ms) {

}
function callback() {
	console.log("HI there!");
}

setTimeout(callback , 5*1000)