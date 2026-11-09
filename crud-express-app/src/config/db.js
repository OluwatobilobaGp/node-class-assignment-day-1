const mongoose = require('mongoose');

const connectDB = async () => {
 try {
 // Replace with your actual Connection String from Atlas
  await mongoose.connect(process.env.MONGO_URI);

 console.log("MongoDB Atlas connected successfully");
 } catch (error) {
 console.error("MongoDB Connection failed:", error.message);
 process.exit(1); // Exit process with failure
 }
};

module.exports = connectDB;