const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const multer = require('multer');
const session = require('express-session');
const config = require('../config/config');
const adminLoginAuth = require('../middlewares/adminLoginAuth');

router.use(session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true
}));

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, ('public/images'));
    },
    filename:function(req, file, cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name);
    }

});
const upload = multer({storage:storage});

router.get('/blog-setup', adminController.blogSetup);
router.post('/blog-setup',upload.single('blog_image'), adminController.saveBlogSetup);
router.get('/dashboard', adminLoginAuth.isLogin, adminController.dashboard);
router.get('/create-post', adminLoginAuth.isLogin, adminController.postCreateForm);
router.post('/create-post', adminLoginAuth.isLogin,upload.single('image'), adminController.addPost);


module.exports = router;