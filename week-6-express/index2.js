const express = require('express')
const app = express()
const port = 3001
const path = require("path")

app.get('/', (req, res) => {        //req oject gives us all things about request ; res gives us the responce from the server.
  res.send('Hello Abhisek')        // THESE ARE request handler. 
})

app.use(express.static(path.join(__dirname, "./public"))) 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

