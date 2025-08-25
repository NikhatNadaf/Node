const http = require("http");

let users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Merri Smith" },
  { id: 4, name: "Gem Smith" }
];

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  // READ - GET
  if (req.method === "GET" && req.url === "/users") {
    res.end(JSON.stringify(users));
  }

  // CREATE - POST
  else if (req.method === "POST" && req.url === "/users") {
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString(); // collect request body
    });

    req.on("end", () => {
      const newUser = JSON.parse(body);
      newUser.id = users.length + 1;
      users.push(newUser);
      res.end(JSON.stringify({ message: "User added", user: newUser }));
    });
  }

  // UPDATE - PUT
  else if (req.method === "PUT" && req.url.startsWith("/users/")) {
    const id = parseInt(req.url.split("/")[2]);
    let body = "";
    req.on("data", chunk => (body += chunk.toString()));
    req.on("end", () => {
      const updatedData = JSON.parse(body);
      users = users.map(user =>
        user.id === id ? { ...user, ...updatedData } : user
      );
      res.end(JSON.stringify({ message: "User updated", users }));
    });
  }

  // DELETE
  else if (req.method === "DELETE" && req.url.startsWith("/users/")) {
    const id = parseInt(req.url.split("/")[2]);
    users = users.filter(user => user.id !== id);
    res.end(JSON.stringify({ message: `User ${id} deleted`, users }));
  }

  // If no route matches
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Not Found" }));
  }
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
