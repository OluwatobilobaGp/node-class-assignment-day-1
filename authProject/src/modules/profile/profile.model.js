import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    phone: String,
    address: String,
    gender: String,
    bio: String
  },
  {
    timestamps: true
  }
);

const Profile = mongoose.model("Profile", profileSchema, "profile");

export default Profile;
