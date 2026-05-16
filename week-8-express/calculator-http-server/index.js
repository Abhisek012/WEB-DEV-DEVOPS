// Express is a external dependecies

//creating a http server that supports 4 routs (/sum, /sub , /div , /mul )


const express = require("express");

const app = express();

app.listen(3000); //localhost(ex.  google.xom )//127.0.0.1


// QUERY PARAMETER:

//http://localhost:3000/sum?a=1&b=2
app.get("/sum", function(req,res){
    const a = parseInt(req.query.a); //string to integer
    const b = parseInt(req.query.b); //because input is string at first (ex. //http://localhost:3000/sum?a=1&b=2&name=Abhisek....is a string intput)

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({
            error: "Invalid input"
        });
    }

    const sum = a+b;

    // res.json({
    //     ans: sum
    // })

    res.send(sum.toString());
})


//  PATH PARAMETERS
//http://localhost:3000/sum/100/200   // here first parameter is fixed and rest are dynamic. i.e. can be 100 or something else. simlarly 200 also

app.get("/sum/:a/:b", function (req,res){
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);

    const sum = a+b;

    res.json({
        ans:sum
    })
})


app.get("/sub")
app.get("/nul")
app.get("/div")

