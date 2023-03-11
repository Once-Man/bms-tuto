const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const session = require('express-session');
const config = require('../config/config');
const adminLoginAuth = require('../middlewares/adminLoginAuth');
router.use(session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true
}));

router.get('/login', adminLoginAuth.isLogout, userController.loadLogin);
router.post('/login', userController.verifyLogin);
router.get('/logout', adminLoginAuth.isLogin, userController.logout);
router.get('/profile', userController.profile);
router.get('/forget-password', adminLoginAuth.isLogout, userController.forgetPasswordForm);
router.post('/forget-password', userController.forgetPassword);

module.exports = router;