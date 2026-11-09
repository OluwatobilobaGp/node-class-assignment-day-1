const express = require('express');
const connectDB = require('./db'); 

const userRoutes = require('./routes/UserRoutes');
const app = express();
app.use(express.json());
connectDB();

// Link the routes
app.use('/api/users', userRoutes);

app.listen(9000, () => console.log('Server IS Active on port 9000')); 