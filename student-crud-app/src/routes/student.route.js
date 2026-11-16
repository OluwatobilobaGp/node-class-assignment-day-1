
const express = require("express");
const router = express.Router();

const studentController = require("../controllers/student.controller");
const protectAdmin = require("../middleware/auth.middleware");

// Protect all student routes
router.post("/", protectAdmin, studentController.createStudent);
router.get("/", protectAdmin, studentController.getStudents);
router.get("/:id", protectAdmin, studentController.getStudent);
router.patch("/:id", protectAdmin, studentController.updateStudent);
router.delete("/:id", protectAdmin, studentController.deleteStudent);

module.exports = router;
