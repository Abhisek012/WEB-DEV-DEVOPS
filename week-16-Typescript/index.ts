// function greet(firstname){
//     console.log("Hello " + firstname);
    
// }

// greet("Abhisek");



function sum(a:number , b: number){
    return a + b;
}

let x = 1; // type inference. we don't need to mention type here. typescript automatically know this
// let y = 3;
let y= "harkirat" //can not assign num to string

// console.log(sum(x,y));


function first_element(arr: number[]): number | null {
    if(arr.length>0){
        // return arr[0] 
        // the typescript compiler feels that arr[0] that arr[0] can be undefined . so here it can be nember | undefine . to counter this we use this
        return arr[0]??null ;
    }
    else {
        return null;
    }
}

let array = [1,2,3,4]

console.log((first_element(array)))

// RETURNING FUNCTION IN A FUNCTION

 function delayedCall (fn: ()=> void){
    setTimeout(fn,1000);  //print after 1 second
 }

 function call (){
    console.log("hi there");
    
 }

 delayedCall(call)


 //INTERFACES

 interface User {
    firstname: string;
    lastName: string;
    email: string;
    age: number;
 }

 function isLegal (user: User){
    if(user.age >18){
        return true;
    }
    return false;
 }

 let user1: User =  {
    firstname: "Abhisek",
    lastName: "Singh",
    email: "ab@gmail.com",
    age: 22
 }

 console.log(isLegal(user1));
 