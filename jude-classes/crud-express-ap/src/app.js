const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const userRoutes = require("./routes/user.route");
const errorHandler = require("./middleware/error.middleware");

const app = express();

// Global middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Express API is running",
  });
});

// API routes
app.use("/api/v1/users", userRoutes);

// Global error handler
app.use(errorHandler);

module.exports = app;