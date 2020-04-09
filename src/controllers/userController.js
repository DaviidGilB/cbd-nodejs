const userService = require('../services/userService');
const authService = require('../services/authService');
const messages = require('../constants/messages');

exports.me = async (req, res) => {
  try {
    const map = await authService.authorized(req);
    if (!map.get('auth')) {
      res.status(403).json({info: messages.ERROR_TOKEN_INVALIDO});
      return;
    }
    res.status(200).json(map.get('user'));
  } catch (e) {
    res.status(500).json({trace: e.toString(), info: messages.ERROR_INTERNO_SERVIDOR});
  }
};
