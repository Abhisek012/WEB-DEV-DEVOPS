const fs = require("fs");


// UNPROMISIFIED VERSION

// function callback(err, data){
//     if(err){
//         console.log("error while reading the file");
        
//     }else{
//         console.log(data);
        
//     }
// }


// fs.readFile("C:/Users/abhis/Desktop/Cohort-HK/WEB-DEV+DEVOPS/week-4/a.txt","utf-8",callback);

// PROMISIFIED VERSION

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

function callback(data){
   console.log(data);
}

function callbackErr(){
    console.log("Error while reading the file.");
    
}

fsReadFilePromisified("C:/Users/abhis/Desktop/Cohort-HK/WEB-DEV+DEVOPS/week-4/a.txt", "utf-8")
    .then(callback)
    .catch(callbackErr)

    // whenever we call promisified version of any asynchronous func call , if it goes well it'll call .then() and read the file. If something goes wrong it will goes to .catch() and throw an error.