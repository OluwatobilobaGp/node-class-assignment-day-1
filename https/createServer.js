const express = require("express");
const app = express();

//import the checkApikey MIDDLEWARE FROM Middlewear
const checkApiKey = require("./middleware");

//Apply the middleware to your route
app.get("/api/data", checkApiKey, (req, res) => {
  res.json("Secret Data Accessed");
});

//Add this at the bottom of server.js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
