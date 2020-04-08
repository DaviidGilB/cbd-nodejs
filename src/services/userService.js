const User = require('../models/User');
const mongoose = require('mongoose');

exports.createUser = async (username, email, password) => {
    const user = new User({
        username: username,
        email: email,
        password: password,
        rols: ['particular']
    });
    user.password = await user.encryptPassword(user.password);
    return user;
};

exports.saveUser = async (user) => {
    return await user.save();
};

exports.getUserByUsername = async (username) => {
    return await User.findOne({username: username});
};

exports.getUserById = async (id) => {
    return await User.findOne({_id: mongoose.Types.ObjectId(id)});
};
