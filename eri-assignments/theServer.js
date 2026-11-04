const express = require("express");
const app = express();

// Import API key middleware
const checkApiKey = require("./middleware");

app.use(express.json());

// Route 1: General Data
app.get("/api/data", checkApiKey("12345"), (req, res) => {
    res.json({ message: "Secret Data Accessed" });
});

// Route 2: Students
app.get("/api/students", checkApiKey("student789"), (req, res) => {
    res.json({ message: "Student Information Accessed" });
});

// Route 3: Products
app.get("/api/products", checkApiKey("product456"), (req, res) => {
    res.json({ message: "Products Accessed" });
});

// Route 4: Profile
app.get("/api/profile", checkApiKey("profile321"), (req, res) => {
    res.json({ message: "User Profile Accessed" });
});

// Route 5: Results
app.get("/api/results", checkApiKey("result987"), (req, res) => {
    res.json({ message: "Results Accessed" });
});

// Error handling middleware
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