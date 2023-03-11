const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    comments: {
        type: Object,
        default: {}
    }
});
const Post = mongoose.model('Post', postSchema);

module.exports = Post;