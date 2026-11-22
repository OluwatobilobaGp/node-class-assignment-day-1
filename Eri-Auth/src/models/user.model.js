const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", "prefer_not_to_say"],
    },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      postalCode: { type: String, trim: true },
      country: { type: String, trim: true },
    },
    occupation: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    education: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    interests: [
      {
        type: String,
        trim: true,
      },
    ],
    website: {
      type: String,
      trim: true,
    },
    socialLinks: {
      linkedIn: { type: String, trim: true },
      instagram: { type: String, trim: true },
      x: { type: String, trim: true },
    },
    preferredLanguage: {
      type: String,
      trim: true,
      default: "en",
    },
    timeZone: {
      type: String,
      trim: true,
    },
    notificationPreferences: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);