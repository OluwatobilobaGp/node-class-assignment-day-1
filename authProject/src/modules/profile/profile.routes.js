
import { Router } from "express";
import Profile from "./profile.model.js";
import authenticate from "../../middleware/authenticate.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";

const router = Router();

// Create a profile for the authenticated user.
router.post(
  "/create-profile",
  authenticate,
  asyncHandler(async (req, res) => {
    const { phone, address, gender, bio } = req.body;

    const userId = req.user._id;

    const existingProfile = await Profile.findOne({ userId });

    if (existingProfile) {
      throw new ApiError(409, "Profile already exists");
    }

    const profile = await Profile.create({
      userId,
      phone,
      address,
      gender,
      bio
    });

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: {
        profile
      }
    });
  })
);

// Get a profile by user ID.
router.get(
  "/:userId",
  asyncHandler(async (req, res) => {
    const profile = await Profile.findOne({
      userId: req.params.userId
    }).populate("userId", "firstName lastName email");

    if (!profile) {
      throw new ApiError(404, "Profile not found");
    }

    res.status(200).json({
      success: true,
      data: {
        profile
      }
    });
  })
);

export default router;
