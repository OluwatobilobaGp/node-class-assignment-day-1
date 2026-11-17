import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRoutes from "./modules/auth/auth.routes.js";

import { globalLimiter } from "./middleware/rateLimiter.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// Security headers.
app.use(helmet());

// CORS configuration.
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Request parsing.
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(cookieParser());

// HTTP request logging.
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Global rate limiter.
app.use("/api", globalLimiter);

// Health check.
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running"
  });
});

// API routes.
app.use("/api/v1/auth", authRoutes);

// 404 handler.
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Centralized error handler.
app.use(errorHandler);

export default app;