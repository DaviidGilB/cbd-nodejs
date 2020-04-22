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

    const route = ""; // TODO: CAMBIAR
    /*
    const { photo } = req.files;
    const route = await fileService.savePhoto(photo, 'post');
    if (route === '') {
      res.status(200).json({info: messages.ERROR_FORMATO_IMAGEN_INCORRECTO});
      return;
    }
     */

    const { title, description, price } = req.body;
    console.log(title);
    console.log(description);
    let post = await postService.createPost(title.substring(1, title.length-1), description.substring(1, description.length-1), price, map.get('user')._id.valueOf(), route);
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

