const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // This loads entire file into memory first
  fs.readFile("error1.js", (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Error reading file");
      return;
    }
    res.end(data); // send whole file at once
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
