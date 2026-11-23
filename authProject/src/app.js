import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRoutes from "./modules/auth/auth.routes.js";
import profileRoutes from "./modules/profile/profile.routes.js";
import userRoutes from "./modules/users/user.routes.js";

import { globalLimiter } from "./middleware/rateLimiter.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const publicDirectory = fileURLToPath(new URL("../public/", import.meta.url));

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
app.use(express.static(publicDirectory));

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

app.get(["/", "/login"], (req, res) => {
  res.sendFile(path.join(publicDirectory, "login.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(publicDirectory, "signup.html"));
});

app.get("/profile", (req, res) => {
  res.sendFile(path.join(publicDirectory, "profile.html"));
});

app.get("/users", (req, res) => {
  res.sendFile(path.join(publicDirectory, "users.html"));
});

// API routes.
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/profile", profileRoutes);

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