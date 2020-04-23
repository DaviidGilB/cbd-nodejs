const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    avatar: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    rol: {type: String, required: true}
});

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.isAdmin = function () {
  return this.rol === "admin";
};

userSchema.methods.isUser = function () {
    return this.rol === "user";
};

module.exports = model('User', userSchema);
