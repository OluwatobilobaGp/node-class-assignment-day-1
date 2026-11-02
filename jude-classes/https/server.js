const express = require('express'); 
const app = express(); 

// Import Api key from middleware
const checkQApiKey = require('../Express-class/middleware');

// Defining a route 
app.get('/api/data', checkApiKey, (req, res) => { 
  res.send('Welcome to my site'); 
});


const PORT = 7000; 
// Starting the server 
app.listen(PORT, () => { 
  console.log(`Server is vibrating on port ${PORT}`); 
});
