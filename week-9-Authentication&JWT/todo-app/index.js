const express = require("express");

const jwt = require("jsonwebtoken");

const { authMIddleware } = require("./middleware")

const app = express();

app.use(express.json()); //if there is any json body in the request , this is the middleware that extracts it
// express.json() = converts JSON request body into JS object
// makes req.body usable
// middleware for parsing incoming JSON data

//creating a app for just myself

const notes = [];
//this is bad- eventually we'll learn about databases (mongodb , postgress , mysql)
//this way is called in memory databases. which is bad


//POST- to create  a note --[after changing it became authenticatd endpoint]

app.post("/notes",authMIddleware, function (req, res) {
  // check if they hae sent the right header, ectract who this user is from the header

const username = req.username;


const note = req.body.note;

notes.push({
  note: note,
  username: username
});//push new note to gobal notes in our app

  res.json({
    message: "Done!",
  });
  //this just gives us the response that note is succesfully pushed
});

//GET- get all my notes  --[after changing it became authenticatd endpoint]

app.get("/notes",authMIddleware, function (req, res) {

  const username = req.username;
  const userNotes = notes.filter(note=> note.username ===username)
  //filter() returns all the notes of same username

  res.json({
    notes: userNotes,
  });
}); //this tells us wehenver I load the app for first time i'll get all the notes i've created

//connecting frontend
// app.get("/", function(req,res){
//     res.sendFile("C:/Users/abhis/Documents/Code/Cohort-HK/WEB-DEV+DEVOPS/week-9-Authentication&JWT/todo-app/fronted")
// })

//better way of writing file location

const path = require("path");

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});


app.listen(3000);






//Authentication and JWT


const users=[{
  username:"abhi",
  password:"123132"
}]
//sign up - create an account

app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const userExists = users.find(user=> user.username ===username);
  if(userExists){
    return res.status(403).json({
      message: "User with username already exists"
    })
  }

  users.push({
    username:username,
    password: password
  })

  res.json({
    message:"You have signed up."
  })
})

app.get("/signup", function(req, res){

    res.sendFile(
        path.join(__dirname, "frontend", "signup.html")
    );

});

// app.post("/signup") = signup API

// req.body = incoming signup data

// users.find() = search existing users

// status(403) = forbidden/error

// users.push() = add new user

// res.json() = send response


//~~~~~~~~~~~~~sign in (difficult thansighup)~~~~~~~~~~~

app.post("/signin",function(req,res){
  const username = req.body.username;
  const password = req.body.password;

  const userExists = users.find(user => user.username === username && user.password === password);

  if(!userExists){
    res.status(403).json({
      message:"Incorrect credentials"
    })
    return;
  }

  //json web tokens
  const token = jwt.sign({
    username: username
  },"Abhi123");
  
  res.json({
    token: token
  })

})

app.get("/signin", function(req, res){

    res.sendFile(
        path.join(__dirname, "frontend", "signin.html")
    );

});

//now we'll do some changes in /notes so that we get autenticaed results (i.e adding jwt token so that we verify user to it's own feed)


// | Method      | Returns             |
// | ----------- | ------------------- |
// | `.find()`   | first matching item |
// | `.filter()` | ALL matching items  |
