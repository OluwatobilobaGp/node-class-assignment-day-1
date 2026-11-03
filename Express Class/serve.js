const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to our Express server!' });
});

app.get('/about', (req, res) => {
    res.json({ message: 'About Us' });
});

app.get('/contact', (req, res) => {
    res.json({ message: 'Contact Us', email: 'student@example.com' });
});

app.get('/services', (req, res) => {
    res.json({ message: 'Our Services', description: 'We provide web development services.' });
});


app.get('/students', (req, res) => {
    res.json([
        { id: 1, name: 'Toheeb' },
        { id: 2, name: 'Student Two' },
        { id: 3, name: 'Student Three' }
    ]);
});



app.use((req, res) => {
    res.status(404).json({ message: 'Page Not Found' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is vibrating at http://localhost:${PORT}`);
});