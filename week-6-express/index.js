const express = require('express')
const app = express()  //creting an express object and use it . can name it anything according to our use case. //can create different express object and use this but recomended. we use diff routers for this.
const port = 3000

app.get('/', (req, res) => {        //req oject gives us all things about request ; res gives us the responce from the server.
  res.send('Hello Abhisek')        // THESE ARE request handler. 
})

app.get('/json', (req, res) => {
  res.json({
    name:"Abhisek Prusty",
    id: "123"
  })
  // res.json({
  //   name:"Abhisek Prusty",
  //   id: "123"
  // })
})

app.get('/asd', (req, res) => {
  res.send('Hello Abhisek from asd!')
  // console.log(req); 
  //req will gives us tons of informations about the http server we are running like header , browser etc.
  
})

app.post('/', (req, res) => {
  res.send('Hello World from post!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// ```````````````````````````````````````````````````````````````````````````````

// HTTP, one request → one response.
// You can’t send two separate responses for a single route.

// 👉 The first res.json():

// Sends the response
// Ends the request lifecycle

// 👉 The second res.json():

// Tries to send again
// ❌ Express throws error: "Cannot set headers after they are sent"

// 🚫 Why this restriction exists

// HTTP works like this:

// Client → sends request
// Server → sends one complete response
// Connection closes (or moves on)

// There’s no concept of “multiple responses” for one request.

// ✅ How to do it correctly
// ✔ Option 1: Send everything in one response
// res.json({
//   name: "Abhisek Prusty",
//   id: "123",
//   extra: "some more data"
// })
// ✔ Option 2: Send an array
// res.json([
//   { name: "Abhisek Prusty", id: "123" },
//   { name: "Another User", id: "456" }
// ])
// ✔ Option 3: Use multiple routes
// app.get('/user1', ...)
// app.get('/user2', ...)


// practice a todo using http.

// node --- express(http server)
// java --- springboot(http server)
// python --- flask(http server)
// rust --- actix-web(http server)

// 💡 Real-life analogy  WHY WE USED "app" here

// Think of it like:

// express() → creates a restaurant
// app → your restaurant object
// app.get() → menu items
// app.use() → rules (like “self-service”)
// app.listen() → opening the restaurant