import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // make we fit receive JSON

// 1. CONNECT TO MONGODB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log("Error:", err));

// 2. CREATE MODEL - Like table for database
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  course: String,
});

const Student = mongoose.model("Student", studentSchema);

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
  res.json(student);
});

// UPDATE - Update student
// PUT http://localhost:5000/students/:id
app.put("/students/:id", async (req, res) => {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE - Delete student
// DELETE http://localhost:5000/students/:id
app.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student deleted" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server dey run for port ${process.env.PORT}`);
});