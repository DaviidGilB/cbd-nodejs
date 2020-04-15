const Post = require('../models/Post');

exports.createPost = async (title, description, price, userId) => {
    return new Post({
        title: title,
        description: description,
        price: price,
        userId: userId,
        date: Date.now()
    });
};

exports.savePost = async (post) => {
    return await post.save();
};

exports.getAllPosts = async () => {
    return await Post.find({}, {_id: 0, __v: 0, rol: 0})
};