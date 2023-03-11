const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({

    blog_title: {
        type: String,
        required: true
    },
    blog_logo: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;