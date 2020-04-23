const authService = require('../services/authService');
const postService = require('../services/postService');
const fileService = require('../services/fileService');
const messages = require('../constants/messages');

exports.all = async (req, res) => {
  try {
    const map = await authService.authorized(req);
    if (!map.get('auth')) {
      res.status(200).json({info: messages.ERROR_TOKEN_INVALIDO});
      return;
    }
    const posts = await postService.getAllPostsWithUser();
    res.status(200).json({object: posts, info: messages.OK_POSTS_RECUPERADOS_CORRECTAMENTE});
  } catch (e) {
    res.status(200).json({object: e.toString(), info: messages.ERROR_INTERNO_SERVIDOR});
  }
};

exports.create = async (req, res) => {
  try {
    const map = await authService.authorized(req);
    if (!map.get('auth')) {
      res.status(200).json({info: messages.ERROR_TOKEN_INVALIDO});
      return;
    }
    const { title, description, price, photo } = req.body;

    const urlPhoto = await fileService.savePhoto(photo, 'post');

    let post = await postService.createPost(title, description, price, map.get('user')._id.valueOf(), urlPhoto);
    try {
      await postService.savePost(post);
    } catch (e) {
      res.status(200).json({object: e.toString(), info: messages.ERROR_CAMPOS_PUBLICACION_INCORRECTOS});
      return;
    }
    res.status(200).json({info: messages.OK_PUBLICACION_CREADA_CORRECTAMENTE});
  } catch (e) {
    res.status(200).json({object: e.toString(), info: messages.ERROR_INTERNO_SERVIDOR});
  }
};

