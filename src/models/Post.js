const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    userId: {type: String, required: true},
    date: {type: Date, required: true}
});

module.exports = model('Post', postSchema);
