const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";

  // MongoDB duplicate key.
  if (err.code === 11000) {
    statusCode = 409;
    message = "A record with this information already exists";
  }

  // Mongoose validation errors.
  if (err.name === "ValidationError") {
    statusCode = 422;
    message = "Database validation failed";
  }

  // Mongoose invalid ObjectId.
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource identifier";
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack
    })
  });
};

export default errorHandler;