const mongoose = require('mongoose');
require("../models/User");
const User = mongoose.model('User');

const searchUserByEmail = async (email) => {
    return await User.findOne({ email: email });
}

const listUsers = async () => {
    return await User.find().select('-password -__v');
}

const removeUser = async (id) => {
    return await User.deleteOne({ _id: id })
}

const searchUserById = async (id) => {
    return await User.findById(id);
}

const updateUser = async (id, userInformation) => {
    return await User.findByIdAndUpdate(id, userInformation);
}

const createUser = async (userInformation) => {
    await new User(userInformation).save()
};

module.exports = { searchUserByEmail, listUsers, removeUser, searchUserById, updateUser, createUser };
