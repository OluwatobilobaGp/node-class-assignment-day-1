const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json()); // make we fit receive JSON

// 1. CREATE MODEL
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  course: String,
});

const Student = mongoose.model("Student", studentSchema);

// 2. VALIDATE STUDENT IDS
app.param("id", (req, res, next, id) => {
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      error: "Invalid student ID",
      message: "Use the MongoDB _id returned when creating or listing students.",
    });
  }

  return next();
});

// 3. CRUD ROUTES

// CREATE - Add new student
// POST http://localhost:5000/students
app.post("/students", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL - Get all students
// GET http://localhost:5000/students
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// READ ONE - Get one student by ID
// GET http://localhost:5000/students/:id
app.get("/students/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  res.json(student);
});

// UPDATE - Update student
// PUT http://localhost:5000/students/:id
app.put("/students/:id", async (req, res) => {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) {
    return res.status(404).json({ error: "Student not found" });
  }

  res.json(updated);
});

// DELETE - Delete student
// DELETE http://localhost:5000/students/:id
app.delete("/students/:id", async (req, res) => {
  const deleted = await Student.findByIdAndDelete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: "Student not found" });
  }

  res.json({ message: "Student deleted" });
});

const startServer = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing from the .env file");
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected!");

  app.listen(PORT, () => {
    console.log(`Server dey run for port ${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server:", err.message);
  process.exitCode = 1;
});
