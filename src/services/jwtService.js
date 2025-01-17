const jwt = require('jsonwebtoken');

exports.getToken = async (id) => {
    return await jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: 86400
    });
};

exports.decodeToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};
