
const jwt = require("jsonwebtoken");

const protectAdmin = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Admin authentication required.",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Confirm admin role and approved email
    if (
      decoded.role !== "admin" ||
      decoded.email?.toLowerCase() !== process.env.ADMIN_EMAIL?.toLowerCase()
    ) {
      return res.status(403).json({
        success: false,
        message: "Forbidden. Admin access only.",
      });
    }

    // Attach admin details to request
    req.admin = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token.",
    });
  }
};

module.exports = protectAdmin;
