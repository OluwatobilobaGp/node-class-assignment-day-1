const express = require('express'); 
const app = express();

// Importing checkapi middleware from middleware.js
const checkApiKey = require('./middleware.js');


// Both paths return the protected data.
app.get(['/', '/api/data'], checkApiKey, (req, res) => {
  res.json('Secret data accessed');
}); 

const PORT = 7000;
// Starting the server 
app.listen(PORT, () => { 
  console.log(`Server is vibrating on port http://localhost:${PORT}`); 
});


