const http = require('node:http');

const server = http.createServer((req, res) => {
  res.end('Hello, this is your first Node.js server!');
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});