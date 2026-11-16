const Student = require("../models/student.model");

// Create
const createStudent = async (data) => {
    return await Student.create(data);
};

// Read ALL
const getStudents = async () => {
    return await Student.find().sort({ createdAt: -1 });
};

// Read ONE
const getStudentById = async (id) => {
    return await Student.findById(id);
};

// Update
const updateStudent = async (id, data) => {
    return await Student.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
};

// Delete
const deleteStudent = async (id) => {
    return await Student.findByIdAndDelete(id);
};

module.exports = {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
};