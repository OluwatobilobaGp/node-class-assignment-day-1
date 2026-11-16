const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true,
    },

    matricNumber: {
      type: String,
      required: [true, "Matric number is required"],
      trim: true,
      unique: true,
    },

    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },

    level: {
      type: Number,
      required: [true, "Level is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);