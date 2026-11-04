const express = require('express');
const app = express();

// Import the API key middleware
const checkApiKey = require('./middlewares/middleware');

// Route 1: Home
app.get('/', checkApiKey('1702'), (req, res) => {
  res.send('Welcome to my Express server');
});

// Route 2: Secret Data
app.get('/api/mydata', checkApiKey('5706'), (req, res) => {
  res.send('Secret Data Accessed');
});

// Route 3: Users
app.get('/api/users', checkApiKey('2703'), (req, res) => {
  res.json({
    users: [
      { id: 1, name: 'Mukhtar' },
      { id: 2, name: 'Aisha' }
    ]
  });
});

// Route 4: Products
app.get('/api/products', checkApiKey('3704'), (req, res) => {
  res.json({
    products: [
      { id: 1, name: 'Laptop', price: 450000 },
      { id: 2, name: 'Mouse', price: 5000 }
    ]
  });
});

// Route 5: Orders
app.get('/api/orders', checkApiKey('4705'), (req, res) => {
  res.json({
    orders: [
      { id: 1, product: 'Laptop', quantity: 1 }
    ]
  });
});

// Route 6: Courses
app.get('/api/courses', checkApiKey('6707'), (req, res) => {
  res.json({
    courses: [
      { id: 1, name: 'Web Development' },
      { id: 2, name: 'Database Management' }
    ]
  });
});

// Route 7: Teachers
app.get('/api/teachers', checkApiKey('7708'), (req, res) => {
  res.json({
    teachers: [
      { id: 1, name: 'Mr. Adeyemi', subject: 'Web Development' },
      { id: 2, name: 'Ms. Chioma', subject: 'Database Management' }
    ]
  });
});

// Handle routes that do not exist
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

// Error-handling middleware goes after all routes
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

const PORT = 3500;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});