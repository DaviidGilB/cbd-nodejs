const userService = require('../services/userService');
const jwtService = require('../services/jwtService');
const messages = require('../constants/messages');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let user = await userService.createUser(username, email, password);
        try {
            user = await userService.saveUser(user);
        } catch (e) {
            res.status(500).json({object: e.toString(), info: messages.ERROR_USUARIO_EMAIL_EXISTENTE});
            return;
        }
        const token = await jwtService.getToken(user._id);
        res.status(200).json({object: token, info: messages.OK_USUARIO_CREADO_CORRECTAMENTE});
    } catch (e) {
        res.status(500).json({object: e.toString(), info: messages.ERROR_INTERNO_SERVIDOR});
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userService.getUserByUsername(username);
        if (!user) {
            res.status(404).json({info: messages.ERROR_USUARIO_NO_ENCONTRADO});
            return;
        }
        const passwordIsValid = await user.validatePassword(password);
        if (!passwordIsValid) {
            res.status(404).json({info: messages.ERROR_CONTRASENA_INCORRECTA});
            return;
        }
        const token = await jwtService.getToken(user._id);
        res.status(200).json({object: token, info: messages.OK_SESION_INICIADA_CORRECTAMENTE});
    } catch (e) {
        res.status(500).json({object: e.toString(), info: messages.ERROR_INTERNO_SERVIDOR});
    }
};
