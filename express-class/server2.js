const express = require('express');
const app = express();

// Import the checkApiKey middleware from middleware.js
const checkApiKey = require('./middlewares/middleware');

// Apply the middleware to your route (Route)
app.get('/api/mydata', checkApiKey, (req, res) => {
  res.send('Secret Data Accessed');
});

// Add this at the bottom of server2.js (after all app.get/app.post route)
app.use((err, req, res, next) => {
  console.error(err.stack);  
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
}); 

const PORT = 3200;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});