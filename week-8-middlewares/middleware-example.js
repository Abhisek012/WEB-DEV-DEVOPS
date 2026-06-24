const express = require("express"); // import Express framework

const app = express(); // create Express app


// Middleware function
function logger(req, res, next) {
    console.log("Request received"); // runs on every request
    next(); // pass control to next middleware/route
}

app.use(logger); // apply middleware globally


// Route handler
app.get("/", function(req, res) {
    res.send("Hello World"); // send response to browser
});


// Start server
 // server runs on port 3000
app.listen(3000);



// Extra short memory note:


// Middleware = code that runs before route handler
// next() = continue request flow
// app.use() = apply middleware
// req = request data

// res = response data
// res = response data