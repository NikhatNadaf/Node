//real time example : Authentication
const express = require("express");
const app = express();

// Authentication middleware
function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];

  if (token === "secret123") {
    console.log("Auth passed");
    next(); // allow
  } else {
    res.status(401).send("Unauthorized"); // stop
  }
}

app.use(authMiddleware);

app.get("/", (req, res) => {
  res.send("Home Page - Authenticated");
});


app.get("/dashboard", (req, res) => {
  res.send("Welcome to your dashboard!");
});

app.listen(3000, () => console.log("Server running on port 3000"));