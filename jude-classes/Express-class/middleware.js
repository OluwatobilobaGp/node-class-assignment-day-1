const checkApiKey = (req, res, next) => {
  if (req.query.api_key === '12345') {
    return next();
  }

  return res.status(401).send('Unauthorized');
};

module.exports = checkApiKey;

