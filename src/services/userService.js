const User = require('../models/User');

exports.createUser = async (username, email, password) => {
    const user = new User({
        username: username,
        email: email,
        password: password
    });
    user.password = await user.encryptPassword(user.password);
    return user;
};

exports.saveUser = async (user) => {
    return await user.save();
};

exports.getUser = async (username) => {
    return await User.findOne({username: username});
};
