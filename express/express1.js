// Importing express module
const express = require("express")
const app = express()


// Handling GET / request
app.get("/", (req, res, next) => {
  res.send("This is the express server")
})

// Handling GET /hello request
app.get("/hello", (req, res, next) => {
  res.send("This is the hello response");
})

app.post("/login", (req, res) => {
  res.send("Login Page");
});

app.get("/user/:id", (req, res) => {
  res.send(`User ID is ${req.params.id}`);
});



// Server setup
app.listen(3000, () => {
  console.log("Server is Running")
})
