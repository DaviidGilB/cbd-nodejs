const User = require('../models/User');
const mongoose = require('mongoose');

exports.createUser = async (username, name, email, password) => {
    const user = new User({
        username: username,
        name: name,
        email: email,
        password: password,
        rol: 'user'
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
    return await User.findOne({_id: mongoose.Types.ObjectId(id)}, {__v: 0, rol: 0, password: 0});
};

exports.deleteUsers = async () => {
    await User.find({rol: 'user'}).deleteMany();
};

exports.getAllUsers = async () => {
    return await User.find({rol: 'user'}, {_id: 0, __v: 0, rol: 0, password: 0})
};
