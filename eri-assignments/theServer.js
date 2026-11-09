const express = require("express");
const app = express();

const checkApiKey = require("./middleware");

app.use(express.json());

app.get("/api/data", checkApiKey("12345"), (req, res) => {
    res.json({ message: "Secret Data Accessed" });
});

app.get("/api/students", checkApiKey("student789"), (req, res) => {
    res.json({ message: "Student Information Accessed" });
});

app.get("/api/products", checkApiKey("product456"), (req, res) => {
    res.json({ message: "Products Accessed" });
});

app.get("/api/profile", checkApiKey("profile321"), (req, res) => {
    res.json({ message: "User Profile Accessed" });
});

app.get("/api/results", checkApiKey("result987"), (req, res) => {
    res.json({ message: "Results Accessed" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: "Something went wrong!",
        message: err.message
    });
});

const PORT = 7000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});