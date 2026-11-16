
const express = require("express");
const router = express.Router();

const passport = require("../config/passport");
const authController = require("../controllers/auth.controller");

// Start Google login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  authController.googleLoginSuccess
);

module.exports = router;
