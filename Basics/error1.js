const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    const fileStream = fs.createWriteStream("uploaded_file.txt");

    // Request ke chunks stream hoke file me likhe jaayenge
    req.pipe(fileStream);

    req.on('end', () => {
      res.end('File uploaded successfully!');
    });
  } else {
    res.end('Send a POST request to upload a file.');
  }
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
