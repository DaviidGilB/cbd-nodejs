const jwtService = require('./jwtService');
const userService = require('./userService');

exports.authorized = async (req) => {
    let res = new Map();
    try {
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1].trim();
        const decodeToken = jwtService.decodeToken(token);
        const user = await userService.getUserById(decodeToken.id);
        res.set("auth", true);
        res.set("user", user);
    } catch (e) {
        res.set("auth", false);
        res.set("user", null);
    }
    return res;
};
