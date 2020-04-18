const Post = require('../models/Post');
const userService = require('../services/userService');

exports.createPost = async (title, description, price, userId, photo) => {
    return new Post({
        title: title,
        description: description,
        price: price,
        userId: userId,
        date: Date.now(),
        photo: photo
    });
};

exports.savePost = async (post) => {
    return await post.save();
};

exports.getAllPosts = async () => {
    return await Post.find({}, {_id: 0, __v: 0})
};

exports.getAllPostsWithUser = async () => {
    let posts = [];
    let results = await this.getAllPosts();
    for (let i = 0; i < results.length; i++) {
        let user = await userService.getUserById(results[i].userId);
        posts.push({
            title: results[i].title,
            description: results[i].description,
            price: results[i].price,
            userId: results[i].userId,
            date: results[i].date,
            photo: results[i].photo,
            user
        });
    }
    return posts;
};
