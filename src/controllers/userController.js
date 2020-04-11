const authService = require('../services/authService');
const userService = require('../services/userService');
const messages = require('../constants/messages');

exports.me = async (req, res) => {
  try {
    const map = await authService.authorized(req);
    if (!map.get('auth')) {
      res.status(200).json({info: messages.ERROR_TOKEN_INVALIDO});
      return;
    }
    let user = map.get('user');
    user = {username: user.username, email: user.email};
    res.status(200).json({object: user, info: messages.OK_USUARIO_RECUPERADO_CORRECTAMENTE});
  } catch (e) {
    res.status(200).json({object: e.toString(), info: messages.ERROR_INTERNO_SERVIDOR});
  }
};

exports.deleteUsers = async (req, res) => {
  try {
    const map = await authService.authorized(req);
    if (!map.get('auth')) {
      res.status(200).json({info: messages.ERROR_TOKEN_INVALIDO});
      return;
    }
    const user = map.get('user');
    if (!user.isAdmin()) {
      res.status(200).json({info: messages.ERROR_SIN_AUTORIZACION});
      return;
    }
    await userService.deleteUsers();
    res.status(200).json({info: messages.OK_USUARIOS_ELIMINADOS_CORRECTAMENTE});
  } catch (e) {
    res.status(200).json({object: e.toString(), info: messages.ERROR_INTERNO_SERVIDOR});
  }
};

exports.all = async (req, res) => {
  try {
    const map = await authService.authorized(req);
    if (!map.get('auth')) {
      res.status(200).json({info: messages.ERROR_TOKEN_INVALIDO});
      return;
    }
    let users = await userService.getAllUsers();
    res.status(200).json({object: users, info: messages.OK_USUARIOS_RECUPERADOS_CORRECTAMENTE});
  } catch (e) {
    res.status(200).json({object: e.toString(), info: messages.ERROR_INTERNO_SERVIDOR});
  }
};
