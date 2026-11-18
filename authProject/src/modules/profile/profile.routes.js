import { Router } from "express";
import User from "../users/user.model.js";
import Profile from "./profile.model.js";

const router = Router();

router.post("/create-profile", async (req, res) => {
  try {
    const { userId, phone, address, gender, bio } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const existingProfile = await Profile.findOne({ userId });

    if (existingProfile) {
      return res.status(400).json({
        message: "Profile already exists"
      });
    }

    const profile = await Profile.create({
      userId,
      phone,
      address,
      gender,
      bio
    });

    res.status(201).json({
      message: "Profile created successfully",
      profile
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      userId: req.params.userId
    }).populate("userId", "firstName lastName email");

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found"
      });
    }

    res.status(200).json({ profile });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

export default router;
