const http = require('node:http');
app.use(express.json());
app.use(express.static('public'));

// const server = http.createServer((req, res) => {
//     res.end('Hello, this is your first Node.js server!');
// });

const checkApiKey = (req, res, next) => {
 if (req.query.api_key === '12345') {
 next();
 } else {
 res.status(401).send('Unauthorized');
 }
};

app.get('/api/data', checkApiKey, (req, res) => {
  res.send('Secret Data Accessed');
}); 

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});