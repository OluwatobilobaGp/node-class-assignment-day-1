const express = require('express');
const app = express();

const checkApiKey = (req, res, next) => {

  try{
    // Extract the API key from the request headers or query parameters
    const apiKey = req.query.api_key;

    // Check if the API key is present
    if (!apiKey) {
      return res.status(401).send('Unauthorized/Bad Request: API key is missing')
    }

    // Validate the API key
    if (apiKey === '12345') {
      next(); // Success, Proceed to the next middleware or route handler
    } else {
      res.status(401).send('Unauthorized');
    }

  } catch (err) {
    // Catch any unexpected errors and respond with a 500 status code
    console.error('Error in checkApiKey middleware: ', err.stack);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: err.message
    });
  }

  if (req.query.api_key === '12345') {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};  

// Export the middleware function
module.exports = checkApiKey;