const checkApiKey = (req, res, next) => {
  if (req.query.api_key === '12345') {
    return next();
  }

  return res.status(401).json({
    error: 'Unauthorized',
    message: 'Missing or invalid API key',
  });
};

module.exports = checkApiKey;