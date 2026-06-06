const express = require("express")
const { Pool } = require("pg")


//this is same as mongoose.connect("uri") 
const pool = new Pool({
    connectionString: ""
}) 


const app = express();
app.use(express.json())



app.post("/signup",async (req,res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;


// console.log("INSERT INTO users (username, email, password) VALUES ('" + username + "','" + email + "','" + password + "')");

const response = await pool.query(`INSERT INTO users (username , email, password) VALUES ($1, $2 , $3) RETURNING id;`, [username , email, password ])

console.log(response);

res.json({
    message: "Signed up successfully",
    id: response.rows[0].id
})


})

app.post("/signin",async(req,res)=>{
    const email =  req.body.email;
    const password =  req.body.password;

    const response = await pool.query(`SELECT * FROM users WHERE email = '${email}' AND password='${password}'`);
    console.log(response);

    const userExists = response.rows[0];

    if (!userExists){
        res.status(403).json({
            message: "Incorrect credentials",
        })
        return;
        
    }else{
        res.json({
            token: "jfjso"
        })
    }     
    //WRITE THE JWT TOKEN LOGIC

    
})





app.listen(3000, ()=>{
    console.log(`App listening on port 3000 `);
    
})