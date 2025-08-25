const https = require("https");
const fs = require("fs");

// SSL cert and key
const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert"),
};

// Create HTTPS server
https.createServer(options, (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, Secure World without Express!");
}).listen(5000, () => {
  console.log("HTTPS server running at https://localhost:5000");
});
