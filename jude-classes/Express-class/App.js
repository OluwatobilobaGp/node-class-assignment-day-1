const express = require('express'); 
const userRoutes = require('./routes/UserRoutes'); 

const app = express(); 
app.use(express.json()); 

// Link the routes 
app.use('/api/users', userRoutes); 

app.listen(3000);