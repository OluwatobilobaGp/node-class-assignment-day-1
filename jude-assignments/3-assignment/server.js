const express = require('express'); 
const app = express(); 
const PORT = 7000; 
// Defining a route 
app.get('/', (req, res) => { 
  res.send('Welcome to my site'); 
});

app.get('/about', (req, res) => { 
  res.send('About Page'); 
});

app.get('/contact', (req, res) => { 
  res.send('Contact Page'); 
});

app.get('/sales', (req, res) => { 
  res.send('Sales Page'); 
});

app.get('/shop', (req, res) => { 
  res.send('Shop Page'); 
});

app.get('/sponsors', (req, res) => { 
  res.send('Sponsors Page'); 
});

// Starting the server 
app.listen(PORT, () => { 
  console.log(`Server is vibrating on port ${PORT}`); 
});