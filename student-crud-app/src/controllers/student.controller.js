const studentService = require("../services/student.service");
const emailService = require("../services/email.service");

// CREATE STUDENT

exports.createStudent = async (req, res, next) => {
  try {
    // Save student in MongoDB
    const student = await studentService.createStudent(req.body);

    // Send welcome email
    let emailSent = false;

    try {
      await emailService.sendWelcomeEmail(student);
      emailSent = true;
    } catch (emailError) {
      console.error("Welcome email failed:", emailError.message);
    }
    res.status(201).json({
      success: true,
      message: emailSent
        ? "Student created successfully and welcome email sent"
        : "Student created successfully, but welcome email failed",
      emailSent,
      data: student,
    });

  } catch (error) {
    next(error);
  }
};

// GET ALL STUDENTS
exports.getStudents = async (req, res, next) => {
  try {
    const students = await studentService.getStudents();

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

// GET SINGLE STUDENT
exports.getStudent = async (req, res, next) => {
  try {
    const student = await studentService.getStudentById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE STUDENT
exports.updateStudent = async (req, res, next) => {
  try {
    const student = await studentService.updateStudent(
      req.params.id,
      req.body
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE STUDENT
exports.deleteStudent = async (req, res, next) => {
  try {
    const student = await studentService.deleteStudent(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};