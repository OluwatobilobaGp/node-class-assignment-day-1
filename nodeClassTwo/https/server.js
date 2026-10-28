const http = require('node:http');

const server = http.createServer((req, res) => {

    // res.writeHead(200, { 'Content-Type': 'text/plain' });
    // res.end('Hello Oluwatobiloba, this is your first Node.js server!');

    const url = req.url;

    if (url === '/' || url === '/home') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to the Home Page');
    } else if (url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('This is the About Page');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404: Page Not Found');
    }

});
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});