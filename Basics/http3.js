http = require("http");
const server = http.createServer((req, res) => {
  const user = { name: "John", age: 25 , city: "New York" };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(user));
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
})
