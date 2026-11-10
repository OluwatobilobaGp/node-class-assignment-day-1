const User = require("../models/user.model");

//Create
const createUser = async(data) =>{
    return await User.create(data);
};

//Read ALL
const getUsers = async () =>{
    return await
    User.find().sort({createdAt: -1});
};

// Read ONE
const getUserById = async (id) =>{
    return await User.findById(id);
};

//Update
const updateUser = async(id, data) =>{
    return await
    User.findByIdAndUpdate(id, data, {
        new: true,
        runhValidators: true,
    });
};

// Delete
const deleteUser = async(id) =>{
    return awaitUser.findByIdAndDelete(id);
};

module.exports ={
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};