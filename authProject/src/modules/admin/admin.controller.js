
import User from "../users/user.model.js";
import Profile from "../profile/profile.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const [users, profiles] = await Promise.all([
      User.find()
        .select(
          "firstName lastName email role isActive isEmailVerified createdAt updatedAt"
        )
        .lean(),

      Profile.find().lean()
    ]);

    const profileMap = new Map(
      profiles.map((profile) => [
        profile.userId.toString(),
        profile
      ])
    );

    const usersWithProfiles = users.map((user) => ({
      ...user,
      profile: profileMap.get(user._id.toString()) || null
    }));

    return res.status(200).json({
      success: true,
      count: usersWithProfiles.length,
      data: {
        users: usersWithProfiles
      }
    });
  } catch (error) {
    next(error);
  }
};
