import asyncHandler from "../../utils/asyncHandler.js";
import User from "./user.model.js";

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
    .select("firstName lastName email role createdAt")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

