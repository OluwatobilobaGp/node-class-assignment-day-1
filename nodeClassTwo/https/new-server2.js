const http = require('node:http');
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const user = {
        id: 1,
        name: "Dev",
        role: "Software Engineer"
    };
    res.end(JSON.stringify(user));
    // res.writeHead(200, { 'Content-Type': 'text/plain' });
    // res.end('Hello, this is your first Node.js server!');
});
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});