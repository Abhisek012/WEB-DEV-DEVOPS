// some asynchronous things in js is 
// fs.readfile()
// setTimeout()
// fs.writFfile()

// and database calls and netwrok calls

// const fs = require("fs")
// fs.readFile("a.txt","utf-8",function(err,data){
//     if(err){
//         console.log("error while reading the file");
        
//     }else{
//         console.log(data);
        
//     }
// })


// write this way for beteer way of writing filepath 
// const fs   = require("fs");
// const path = require("path");

// // build a path that’s always correct relative to this script
// const filePath = path.join(__dirname, "a.txt");

// // Node happily accepts forward‑slashes on Windows,
// // and `path.join` uses the right separator for you.
// fs.readFile(filePath, "utf-8", (err, data) => {
//     if (err) {
//         console.log("error while reading the file");
//     } else {
//         console.log(data);
//     }
// });



// PROMISIFIED VERSION OF fs.readFile

const fs = require("fs")
function fsReadFilePromisified(filePath, encoding) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        })
    })
}



fsReadFilePromisified("C:/Users/abhis/Desktop/Cohort-HK/WEB-DEV+DEVOPS/week-5/a.txt", "utf-8")
    .then(function(data){
        console.log(data);
        
    })
    .catch(function(e){
        console.log("Error while reading the file.");
        
    })


//  CREATE A PROMISIFIED VERSION OF setTimeout()
// witout promisified but with callback
// setTimeout(function callback() { //here it is fine to not to write callbak . we can only mention function(){...}
//   console.log("HI there!");
// }, 5 * 1000);

// let u = 0;
// for (let i = 0; i < 1000; i++) {
//   u += i;
// }
// console.log(u);

//promisified version
function setTimeoutPromisified(delay){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve()
        },delay)
    })
}

setTimeoutPromisified(1000)
    .then(function(){
        console.log("1 second has passed.");
        
    })