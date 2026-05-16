const promiseFour = new Promise((resolve,reject)=>{
    // setTimeout(()=>{
    //     let error = false
    //     // let error = true
    //     if(!error){
    //         resolve({username:"Abhisek",email:"fjjjf@gmial.coom"})
    //     }else{
    //         reject('ERROR: something went wrong')
    //     }
    // },4000);
    let error = true;   //here I also tested the function without set timeout

if (!error) {
  resolve({ username: "Annn", email: "fjefj.com" });
} else {
  reject("Error: something went wrong");
}
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