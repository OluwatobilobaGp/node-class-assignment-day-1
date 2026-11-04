const express = require('express');

const app = express();
const PORT = process.env.PORT || 4000;

const requireApiKey = (expectedApiKey) => (req, res, next) => {
  if (req.query.api_key !== expectedApiKey) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Missing or invalid API key',
    });
  }

  return next();
};

app.get('/', requireApiKey('key-123'), (req, res) => {
  res.send('Welcome to my site');
});

app.get('/about', requireApiKey('key-123'), (req, res) => {
  res.send('About Page');
});

app.get('/contact', requireApiKey('contact-key-123'), (req, res) => {
  res.send('Contact Page');
});

app.get('/sales', requireApiKey('sales-key-123'), (req, res) => {
  res.send('Sales Page');
});

app.get('/shop', requireApiKey('shop-key-123'), (req, res) => {
  res.send('Shop Page');
});

app.get('/sponsors', requireApiKey('sponsors-key-123'), (req, res) => {
  res.send('Sponsors Page');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});