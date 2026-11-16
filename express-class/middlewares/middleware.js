const express = require('express');
const app = express();

const checkApiKey = (req, res, next) => {
    try {
        // Extract the API key from the request headers or query parameters
        const apiKey = req.query.secret_api_key;

        // Check if the API key is present
        if (!apiKey) {
            return res.status(400).send('Unauthorized/Bad Request: API key is missing');
        }

        // Validate the API key 
        if (apiKey === '1234567890') {
            next(); // Success, Proceed to the route handler 
        } else {
            res.status(401).json({
                error: 'Unauthorized',
                message: 'Invalid API key'
            });
        }

    } catch (err) {
        // Catch any unexpected errors and respond with a 500 status code
        console.error('Error in checkApiKey middleware:', err.stack);
        res.status(500).json({
            error: 'Internal Server Error',
            message: err.message
        });
    }

};

// Export the middleware function
module.exports = checkApiKey;