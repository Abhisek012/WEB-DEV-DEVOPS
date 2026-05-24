const express = require ("express")
const { authmiddleware } = require("./middleware")
const jwt = require("jsonwebtoken")
const app = express()
app.use(express.json());

let CURRENT_U = 1;
let CURRENT_ID = 1;

const USERS = []
const TODOS = []


app.post("/signup",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = USERS.find(u=> u.username === username);
    if(!existingUser){
        return res.status(403).json({
            message: "User with this username already exists"
        })
        
    }
    USERS.push({
        username,
        password
    })
    res.json({
        id: CURRENT_ID++,
        message: "Signed up successfully"
    })
})


app.post("/signin",(req,res)=>{
    const username = req.body.username;
    const password  = req.body.password;

    const existingUser = USERS.find(u=> u.username === username && u.password === password);
    if(!existingUser){
        return res.status(403).json({
            message: "Incorrect credentials"
        })
    }
    const token = jwt.sign({
        userId: existingUser.id
    },"secret123123");

    res.json({
        token
    })
})


app.post("/todo",authmiddleware,(req,res)=>{
    const userId = req.userId;
})


app.post("/todos",authmiddleware,(req,res)=>{
    const userId = req.userId;
})

app.listen(3000);