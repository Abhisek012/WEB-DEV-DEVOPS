const express = require("express")

const { authmiddleware } = require("./iddleware")

//usersname , password | USERS table
//organisation | ORGANISATION table
//boards | BOARDS table
//issues | ISSUES table

const users =[{
    id:1,
    username: "Abhisek",
    password: "123123"
},{
    id:2,
    username:"Raman",
    password:"456456"
}]

const organisation=[{
    id:1,
    title:"100xdevs",
    description:"Learning coding platform",
    admin:1,
    member:[2]
},{
    id:2,
    title:"ramans org",
    description:"Experimenting",
    admin:2,
    member:[]
}];

const borads= [{
    id:1,
    title: "100xdevs website frontend",
    organistion: 1
}]

const issues =[{
    id:1,
    title:"Add dark mode",
    boradID: 1,
    state: "IN_PROGRESS" // NEXT_UP | IN_PROGRESS | DONE | ARCHIEVED
},{
    id:2,
    title:"Add 100xdevs dashboard",
    boradID:2,
    state: "DONE"
}]

const app = express();

// CRATE END POINTS
app.post("/signup",(req,res)=>{
    
})
app.post("/signin",(req,res)=>{
    
})
app.post("/organisation",(req,res)=>{
    
})
app.post("/add-member-to-organisation",(req,res)=>{
    
})

app.post("/board",(req,res)=>{
    
})
app.post("/issue",(req,res)=>{
    
})

//READ END POINTS(GET) -- 

app.get("/boards",(req,res)=>{
    
})
app.get("/issues",(req,res)=>{

})
app.get("/members",(req,res)=>{

})


//PUT END POINTS  i,e UPDATE

app.put("/issues",(req,res)=>{

})

// DELETE END POINTS
app.delete("/members", (req,res)=>{
    
})

app.listen(3000);
