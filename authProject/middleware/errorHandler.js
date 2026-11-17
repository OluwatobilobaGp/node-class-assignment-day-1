const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "A record with that value already exists"
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid resource ID"
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.isOperational
    ? err.message
    : "Internal server error";

  return res.status(statusCode).json({
    success: false,
    message
  });
};

export default errorHandler;
