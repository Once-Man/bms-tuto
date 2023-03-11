const Blog = require('../models/blog');

const isBlog = async(req, res, next) => {
    try {
        const blog = await Blog.find({});
        if(blog.length == 0 && req.originalUrl != '/blog-setup'){
            res.redirect('/blog-setup');
        }else{
            next();
        }
    }catch(error){
        console.log(error.message);
    }
}

module.exports = {
    isBlog
};