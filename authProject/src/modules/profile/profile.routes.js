import { Router } from "express";
import authenticate from "../../middleware/authenticate.js";
import validate from "../../middleware/validate.js";
import {
  createProfile,
  getProfile
} from "./profile.controller.js";
import { createProfileSchema } from "./profile.validation.js";

const router = Router();

router.post(
  "/create-profile",
  authenticate,
  validate(createProfileSchema),
  createProfile
);
router.get("/:userId", authenticate, getProfile);

export default router;
