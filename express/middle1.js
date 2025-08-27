const express = require("express");
const app = express();

// Middleware #1
app.use((req, res, next) => {
  console.log("Middleware 1: Request received");
  next(); // pass to next
});

// Middleware #2
app.use((req, res, next) => {
  console.log("Middleware 2: Checking auth...");
  next();
});

app.use((req, res, next) => {
  console.log("Middleware: Blocking request");
  res.status(403).send("Forbidden!"); // stops here
});


// Final Route
app.get("/", (req, res) => {
  res.send("Hello from Route!");
});

app.listen(3000, () => console.log("Server running"));
