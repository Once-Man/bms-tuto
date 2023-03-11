const Blog = require('../models/blog');
const User = require('../models/user');
const Post = require('../models/post');
const bcrypt = require('bcrypt');

const securePassword = async(password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    }catch(error){
        console.log(error.message);
    }
}

blogSetup = async(req, res) => {
    try {
        var blog = await Blog.find({});
        if(blog.length > 0){
            res.redirect('/login');
        }else{
            res.render('blogSetup', {pageTitle: 'Blog Setup', path: 'blog-setup'});
        }
    }catch(error){
        console.log(error.message);
    }
}
saveBlogSetup = async(req, res) => {
    try {

        const blog_title = req.body.blog_title;
        const blog_image = req.file.filename;
        const description = req.body.description;
        const  email = req.body.email;
        const name = req.body.name;
        const password = await securePassword(req.body.password);

        const blog = new Blog({
            blog_title: blog_title,
            blog_logo: blog_image,
            description: description
        });
        await blog.save();

        const user = new User({
            name: name,
            email: email,
            password: password,
            is_admin: 1
        });
        const userData = await user.save();
        if(userData){
            res.redirect('/login');
        }else{
            res.render('blogSetup', {message: 'Blog not setup!'});
        }
    }catch(error){
        console.log(error.message);
    }
}

dashboard = async(req, res) => {
    res.render('admin/dashboard');
}

postCreateForm = async(req, res)=> {
    try{
        res.render('admin/postDashboard');
    }catch(error){
        console.log(error);
    }
}

addPost = async(req, res) => {
    try{

       
        const post = new Post({
            title : req.body.title,
            content : req.body.content,
            image : req.body.image
        });
        
        const postData = await post.save();
        res.render('admin/postDashboard',{message: 'Post created successfully.'})
    }catch(error){
        console.log(error.message);
    }
}


module.exports = {
    blogSetup,
    saveBlogSetup,
    dashboard,
    postCreateForm,
    addPost,
    
}