const http = require('node:http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    // res.end('Hello Oluwatobiloba, this is your first Node.js server!');
    const user = {
        id: 1,
        name: "Dev",
        role: "Software Engineer"
    };

    res.end(JSON.stringify(user));
});
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});