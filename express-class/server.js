const express = require('express');
const app = express();
const PORT = 3000;

// Defining a route
app.get('/', (req, res) => {
 res.send('Welcome to my Express Server!');
});

// Starting the server
app.listen(PORT, () => {
 console.log(`Server is vibrating on port ${PORT}`);
}); 