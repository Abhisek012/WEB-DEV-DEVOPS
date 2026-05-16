// const promiseFive = new Promise(function(resolve,reject){
//     setTimeout(()=>{
//         let error = true 
//         // let error = false
//         if(!error){
//             resolve({username:"javascript",email:"fjjjf@gmial.coom"})
//         }else{
//             reject('ERROR: JS  went wrong')
//         }
//     },4000);
// })


// // async function consumePromisFive(){
// //     const response = await promiseFive        //here promiseFive is a object so we don't use this as promiseFive() (i.e. not like a function here)
// //     console.log(response);
// // }

// //here if we do hae error or reject situation , async await does not handle itself. We still use try catch block to resolve the issue . 
// //so we can write this (better way)

// async function consumePromisFive(){
//     try {
//     const response = await promiseFive
//     console.log(response)
//     } catch ( err) {
//         console.log(err)
//     }
// }

// consumePromisFive()

// console.log("1")
// async function getAllUsers(){
//     console.log("2")

//     try {
//         console.log("3")
//         const response2 = await fetch('https://jsonplaceholder.typicode.com/users')
//         const data = await response2.json()
//         console.log(data);
//         console.log("4")

//     } catch (error) {
//         console.log("E: " , error)

//     }
//     console.log("5")

// }

// getAllUsers()
// console.log("6")


//writing this in .then and .catch method


// fetch('https://jsonplaceholder.typicode.com/users')
// .then((response)=>{
//     return response.json()
// })
// .then((response)=>{                    
//     console.log(response)
// })
// .catch((err)=> console.log(err))


fetch('https://jsonplaceholder.typicode.com/users')
.then((response)=>{
    console.log(response.json())
})
.catch((err)=> console.log(err))
