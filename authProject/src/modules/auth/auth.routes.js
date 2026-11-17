import { Router } from "express";

import * as authController from "./auth.controller.js";

import {
  signupSchema,
  signinSchema
} from "./auth.validation.js";

import validate from "../../../middleware/validate.js";
import authenticate from "../../../middleware/authenticate.js";

import {
  signupLimiter,
  signinLimiter,
  refreshLimiter
} from "../../../middleware/rateLimiter.js";

const router = Router();

// Public routes.
router.post(
  "/signup",
  signupLimiter,
  validate(signupSchema),
  authController.signup
);

router.post(
  "/signin",
  signinLimiter,
  validate(signinSchema),
  authController.signin
);

router.post(
  "/refresh",
  refreshLimiter,
  authController.refresh
);

router.post(
  "/logout",
  authController.logout
);

// Protected routes.
router.get(
  "/me",
  authenticate,
  authController.me
);

export default router;