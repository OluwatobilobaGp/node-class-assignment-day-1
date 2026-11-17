const User = require("../models/user.model");

// CREATE
const createUser = async (data) => {
  return await User.create(data);
};

// READ ALL
const getUsers = async () => {
  return await User.find().sort({ createdAt: -1 });
};

// READ ONE
const getUserById = async (id) => {
  return await User.findById(id);
};

// UPDATE
const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// DELETE
const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};