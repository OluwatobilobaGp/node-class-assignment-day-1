const checkApiKey = (expectedApiKey) => {
    return (req, res, next) => {
        const apiKey = req.query.api_key;

        if (!apiKey) {
            return res.status(401).send("Unauthorized: API key is missing");
        }

        if (apiKey !== expectedApiKey) {
            return res.status(401).send("Unauthorized: invalid API key");
        }

        next();
    };
};

module.exports = checkApiKey;