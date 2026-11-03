const express = require('express');
const app = express();

const checkApiKey = (req, res, next) => {

  try {
    const apiKey = req.query.api_key;
  } catch (err) {

    console.err('')
  }

  if (req.query.api_key === '12345') {
    return next();
  } else {
    res.status(500).json({ 
      error: 'Something went wrong!',
      message: err.message
    });
  }

  return res.status(401).send('Unauthorized');
};

module.exports = checkApiKey;


// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ 
//     error: 'Something went wrong!',
//     message: err.message
//   });
// });  