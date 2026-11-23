const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      required: [true, "Degree is required"],
      trim: true,
    },
    collegeOrUniversity: {
      type: String,
      required: [true, "College or university is required"],
      trim: true,
    },
    graduationYear: {
      type: Number,
      required: [true, "Graduation year is required"],
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    profilePhoto: {
      type: String,
      default: null,
    },
    currentResidency: {
      type: String,
      required: [true, "Current residency is required"],
      trim: true,
    },
    politicalParty: {
      type: String,
      required: [true, "Political party is required"],
      trim: true,
    },
    religion: {
      type: String,
      required: [true, "Religion is required"],
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      trim: true,
    },
    visionAndMission: {
      type: String,
      required: [true, "Vision and mission are required"],
      trim: true,
    },
    education: {
      type: [educationSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);