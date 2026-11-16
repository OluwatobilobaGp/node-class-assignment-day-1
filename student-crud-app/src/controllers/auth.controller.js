
const jwt = require("jsonwebtoken");

exports.googleLoginSuccess = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Google authentication failed or admin access denied",
      });
    }

    const token = jwt.sign(
      {
        sub: req.user.googleId,
        email: req.user.email,
        role: req.user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Admin authenticated successfully",
      token,
      admin: {
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });
  } catch (error) {
    console.error("Authentication error:", error.message);

    res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};
