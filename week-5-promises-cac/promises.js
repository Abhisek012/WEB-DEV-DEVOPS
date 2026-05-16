const PromiseOne = new Promise(function(resolve, reject){
    setTimeout(function(){
        console.log('Async task is completed');
        resolve();                                       // resolve() connects data with .then()
    },1000)
})

PromiseOne.then(function(){
    console.log("Promise consumed")
})

//promise 2

new Promise(function(resolve,reject){
    setTimeout(() => {
        console.log('Async task 2 is completed');
        resolve();
        
    }, 2000);
}).then(()=>{
    console.log("2nd promise consumed");
    
})

//Promise 3

const PromiseThree = new Promise(function(resolve,reject){
    setTimeout(()=>{
        console.log("Async task 3 is completed");
        resolve({username:"Abhisek",email:"fjjjf@gmial.coom"})        // resolve connects data with .then() ,it assign parameters argumets to .then()
        
    },3000);
})
PromiseThree.then((user)=>{
    console.log(user);
    
})
//we can also write this as this:
// PromiseThree.then(function(user){
//     console.log(user)
// })


// promise 4

const promiseFour = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        let error = true //false
        if(!error){
            resolve({username:"Abhisek",email:"fjjjf@gmial.coom"})
        }else{
            reject('ERROR: something went wrong')
        }
    },4000);
})

// promiseFour
//   .then((data) => console.log(data))
//   .catch((err) => console.error(err));

promiseFour
.then((user)=>{
    // console.log(user);
    return user.username
})
.then((Myusername)=>{                                 //chaining concept applied
    console.log(Myusername);
    
})
.catch((err)=>{
    console.log(err)
})
.finally(()=>{
    console.log("Promise resolved or rejected")
})
// .finally(()=>console.log("Promise resolved or rejected!"))  //anothe way of writing arrow function


// `````````````````````````ASYNC AWAIT`````````````````````````````````````````````


const promiseFive = new Promise(function(resolve,reject){
    setTimeout(()=>{
        let error = true 
        // let error = false
        if(!error){
            resolve({username:"javascript",email:"fjjjf@gmial.coom"})
        }else{
            reject('ERROR: JS  went wrong')
        }
    },4000);
})

// async function consumePromisFive(){
//     const response = await promiseFive        //here promiseFive is a object so we don't use this as promiseFive() (i.e. not like a function here)
//     console.log(response);
// }

//here if we do hae error or reject situation , async await does not handle itself. We still use try catch block to resolve the issue . 
//so we can write this (better way)

async function consumePromisFive(){
    try {
    const response = await promiseFive
    console.log(response)
    } catch ( err) {
        console.log(err)
    }
}

consumePromisFive()


async function getAllUsers(){
    try {
        const response2 = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response2.json()
        console.log(data);
    } catch (error) {
        console.log("E: " , error)
    }
}

getAllUsers()