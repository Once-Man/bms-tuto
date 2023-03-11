const Post = require('../models/post');

getPost = async(req, res) => {
    try{
        const posts = await Post.find({});
        res.render('blog', {
            posts: posts,
            pageTitle: 'Post',
            path: '/',
        });
    }catch(error){
        console.log(error.message);
    }
}
postDetail = async(req, res) => {
    try{
        const id = req.params.id;
    
        const post = await Post.findOne({_id: id});
        res.render('postDetail', {
            post: post,
            pageTitle: 'Post-Detail'
        })
    }catch(error){
        console.log(error.message);
    }
}
addComment = async(req, res) => {
    try{
        var post_id = req.body.post_id;
        var username = req.body.username;
        var comment = req.body.comment;

        console.log(comment );
        await Post.findByIdAndUpdate({ _id: post_id }, {
            $push: {
                "comments":{
                    username:username,
                    comment:comment
                }
            }
        });
        res.status(200).send({success: true, msg:'Comment Added.'});
    }catch(error){
        res.status(200).send({success:false, msg:error.message});
    }
}
module.exports = {
    getPost,
    postDetail,
    addComment
}