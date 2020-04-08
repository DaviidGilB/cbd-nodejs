const userService = require('../services/userService');
const jwtService = require('../services/jwtService');
const messages = require('../constants/messages');

exports.me = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1].trim();
  const decodeToken = jwtService.decodeToken(token);
  const user = await userService.getUserById(decodeToken.id);
  res.status(200).json({user})
};
