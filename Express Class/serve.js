const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Route 1: Home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route 2: About page
app.get('/about', (req, res) => {
    res.send('<h1>About Us</h1><p>Welcome to our Node.js class project.</p>');
});

app.get('/contact', (req, res) => {
    res.send('<h1>Contact Us</h1><p>Email: student@example.com</p>');
});

app.get('/services', (req, res) => {
    res.send('<h1>Our Services</h1><p>We provide web development services.</p>');
});


app.get('/students', (req, res) => {
    res.json([
        { id: 1, name: 'Toheeb' },
        { id: 2, name: 'Student Two' },
        { id: 3, name: 'Student Three' }
    ]);
});

// Route 6: Server information
app.get('/info', (req, res) => {
    res.json({
        message: 'Express server is running successfully',
        port: PORT
    });
});


app.use((req, res) => {
    res.status(404).send('<h1>404 - Page Not Found</h1>');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is vibrating at http://localhost:${PORT}`);
});