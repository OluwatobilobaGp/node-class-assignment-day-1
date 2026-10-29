const express = require('express');
const app = express();
// const PORT = process.env.PORT || 3100;
const PORT = 3100;

app.get('/', (req, res) => {
  res.json('Welcome to my Express server!');
});

app.get('/about', (req, res) => {
  res.json('Built with Node.js and Express.');
});

app.get('/contact', (req, res) => {
  res.json({ email: 'emiabatamukhtar7@gmail.com' });
});

app.get('/services', (req, res) => {
  res.json({ services: ['Web development', 'API development'] });
});

app.get('/users', (req, res) => {
  res.json([{ id: 1, name: 'Mukhtar' }, { id: 2, name: 'Lara' }]);
});

app.get('/products', (req, res) => {
  res.json([
    { id: 1, name: 'Laptop', price: 500000 },
    { id: 2, name: 'Headphones', price: 25000 }
  ]);
});

app.get('/faq', (req, res) => {
  res.json([
    { question: 'What does this server use?', answer: 'Node.js and Express.' },
    { question: 'What format do the routes return?', answer: 'JSON.' }
  ]);
});

// Handle unknown URLs after all the routes.
app.use((req, res) => {
  res.status(404).json('Route not found');
});

app.listen(PORT, () => {
  console.log(`Server is vibrating on port ${PORT}`);
});
