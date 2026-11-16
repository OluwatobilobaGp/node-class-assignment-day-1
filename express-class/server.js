const express = require('express');
const app = express();

// Import the checkApiKey middleware from middleware.js (adjust path if needed)
const checkApiKey = require('./middlewares/middleware');

// Apply the middleware to your route (Route)
app.get('/api/mydata', checkApiKey, (req, res) => {
    res.send('Secret Data Accessed');
});

// Add this at the bottom of server.js (after all app.get/app.post routes)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});