const http = require('node:http');
const app = express();

// Import the checkApiKey middleware from middleware.js
const checkApiKey = require('../express-class/middleware');

// Apply the middleware to your route
app.get('/api/data', checkApiKey, (req, res) => {
  res.send('Secret Data Accessed');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});