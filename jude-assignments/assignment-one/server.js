const http = require('node:http');

const server = http.createServer((req, res) => {
    res.end("hello this your first Node.js server");
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

