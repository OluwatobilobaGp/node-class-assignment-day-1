const mongoose = require('mongoose');

const connectDB = async () => {
 try {
 
  await mongoose.connect(process.env.MONGO_DB);

 console.log("MongoDB Atlas connected successfully");
 } catch (error) {
 console.error("MongoDB Connection failed:", error.message);
 process.exit(1); 
 }
};

module.exports = connectDB;