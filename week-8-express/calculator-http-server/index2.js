const express = require("express");

const path = require("path");

const app = express();

app.listen(3003, () => {
    console.log("Server running on http://localhost:3003");
});

app.get("/", function (req,res){
    // res.sendFile("C:/Users/abhis/Documents/Code/Cohort-HK/WEB-DEV+DEVOPS/week-8-express/calculator-http-server/index.html")

    res.sendFile(path.join(__dirname,"index.html"))
})

app.get("/sum/:a/:b", function (req,res){
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);

    const sum = a+b;

    res.json({
        ans:sum
    })

})

// Payload : sending json data 

app.use(express.json()); //using because we are sending json data

app.post("/sum", function (req,res){
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    const sum = a+b;

    res.json({
        ans:sum
    })

})