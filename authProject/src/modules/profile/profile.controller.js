import ApiError from "../../utils/ApiError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import User from "../users/user.model.js";
import Profile from "./profile.model.js";

const assertProfileAccess = (req, userId) => {
  if (
    req.user.role !== "admin" &&
    req.user._id.toString() !== userId.toString()
  ) {
    throw new ApiError(403, "You are not authorized to access this profile");
  }
};

export const createProfile = asyncHandler(async (req, res) => {
  const requestedUserId = req.validated.body.userId;
  const userId = requestedUserId || req.user._id;

  assertProfileAccess(req, userId);

  const userExists = await User.exists({ _id: userId });
  if (!userExists) {
    throw new ApiError(404, "User not found");
  }

  const existingProfile = await Profile.findOne({ userId });
  if (existingProfile) {
    throw new ApiError(409, "Profile already exists");
  }

  const profileData = { ...req.validated.body };
  delete profileData.userId;
  const profile = await Profile.create({ ...profileData, userId });

  res.status(201).json({
    success: true,
    message: "Profile created successfully",
    data: profile
  });
});

export const getProfile = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  assertProfileAccess(req, userId);

  const profile = await Profile.findOne({ userId })
    .populate("userId", "firstName lastName email");

  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  res.status(200).json({
    success: true,
    data: profile
  });
});

