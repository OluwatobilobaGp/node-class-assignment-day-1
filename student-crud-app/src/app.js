
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const passport = require("./config/passport");
const authRoutes = require("./routes/auth.route");
const studentRoutes = require("./routes/student.route");
const errorHandler = require("./middleware/error.middleware");

// Initialize Express
const app = express();

// Global middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Initialize Passport
app.use(passport.initialize());

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Express API is running",
  });
});

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/students", studentRoutes);

// Global error handler
app.use(errorHandler);

module.exports = app;
