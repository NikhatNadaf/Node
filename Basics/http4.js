const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  const stream = fs.createReadStream("error1.js");
  stream.pipe(res); // stream file directly to response
});

server.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});