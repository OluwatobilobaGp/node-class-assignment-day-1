const checkApiKey = (expectedApiKey) => {
  return (req, res, next) => {
    try {
      // Extract the API key from the query parameters
      const apiKey = req.query.api_key;

      // Check if the API key is present
      if (!apiKey) {
        return res.status(401).send(
          'Unauthorized/Bad Request: API key is missing'
        );
      }

      // Validate the API key for this route
      if (apiKey === expectedApiKey) {
        return next();
      }

      return res.status(401).send('Unauthorized: Invalid API key');
    } catch (err) {
      // Forward unexpected errors to server.js error middleware
      return next(err);
    }
  };
};

// Export the middleware function
module.exports = checkApiKey;