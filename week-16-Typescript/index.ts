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
 

 // ENUM
  
// type KeyInput = "up" | "down" | "left" | "right"

// enum Direction {
//     up,  //0
//     down,  //1
//     left,  //2
//     right   //3
// }

// enum Direction {
//     up = 1, 
//     down,  // becomes 2 by defalt
//     left,  //3
//     right   //4  
// }
// Here if you are assigning string value to enum members , You have assign every member . It's a key value pair thing

//  function doSomething(keyPressed: Direction){
//     // do something
//     if(keyPressed == Direction.up){

//     }
//  //
//  }

//  doSomething("up")
//  doSomething("left")
//  doSomething("eijfji")

// doSomething(Direction.up)
// doSomething(Direction.down)

// Types of Enum Members
// Enum members generally fall into two categories depending on how you use them:

// Numeric Members:
//  The value is a number. By default, the first member starts at 0, and the rest count up. 
//  You can also set them yourself.


// String Members:
//   The value is a string literal. String members are often preferred for easier reading and debugging.


// GENERICS

function identity <T>(args:[T , ...T[]]):T{
    // return args[0]!;  // this might throw error if we give empty array as an input
    return args[0]; // args:[T , ...T[]]  -> By using this we say that the first elment will be always there (we can not call empty array) and then other elements will be there also it can be empty array. 
}

let a1 = identity<string>(["Stringggg", "hi"])
let a2 = identity<number>([33]);   // It's not mandatory to write <type> in function calling. Typescript will automatically knows which type is being called.
let a3 = identity(["Stringggg", 54 ,"fjrj"])   // If we want to use mix bag here we do not mention types explicitely in funciton calling

console.log(a1);
console.log(a2);


a1.toUpperCase() // By generics we can us string properties now