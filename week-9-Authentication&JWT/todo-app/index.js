const express = require("express");

const app = express();

app.use(express.json()); //if there is any json body in the request , this is the middleware that extracts it
// express.json() = converts JSON request body into JS object
// makes req.body usable
// middleware for parsing incoming JSON data

app.listen(3002);

//creating a app for just myself

const notes = [];
//this is bad- eventually we'll learn about databases (mongodb , postgress , mysql)
//this way is called in memory databases. which is bad

//POST- to create  a note

app.post("/notes", function (req, res) {
  const note = req.body.note;
  notes.push(note); //push newe note to gobal notes in our app

  res.json({
    message: "Done!",
  });
  //this just gives us the response that note is succesfully pushed
});

//GET- get all my notes

app.get("/notes", function (req, res) {
  res.json({
    notes,
  });
}); //this tells us wehenver I load the app for first time i'll get all the notes i've created

//connecting frontend
// app.get("/", function(req,res){
//     res.sendFile("C:/Users/abhis/Documents/Code/Cohort-HK/WEB-DEV+DEVOPS/week-9-Authentication&JWT/todo-app/fronted")
// })

//better way of writing file location

const path = require("path");

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "fronted", "index.html"));
});

app.listen(3000);
