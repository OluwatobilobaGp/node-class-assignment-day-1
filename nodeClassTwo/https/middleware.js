app.use(express.json());
app.use(express.static('public'));

const checkApiKey = (req, res, next) => {
    if (req.query.api_key === '12345') {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

// Export the middleware function
module.exports = checkApiKey;