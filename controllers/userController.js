const User = require('../models/user');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const config = require('../config/config');

const sendResetPasswordMail = async(name, email, token)=>{
    try{
        const transport = nodemailer.createTransport({
            host: 'konyan@gmail.com',
            port:587,
            secure: false,
            requireTLS:true,
            auth:{
                user:config.emailUser,
                pass:config.emailPassword
            }
        });
const mailOption = {
    from:config.emailUser,
    to:email,
    subject: 'Reset Password',
    html:'<p>Hii '+name+', Please click here to <a href="http://localhost:3000/reset-password?token=' + token +'">Reset</a>your password.</p>'
}
transport.sendMail(mailOption, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log("Email has been send:-", info.response);
    }
});
    }catch(error){
        console.log(error.message);
    }
}

loadLogin = async(req, res) => {
    try {
        
        res.render('login', {
            pageTitle: 'Login'
        });

    }catch(error){
        console.log(error.message);
    }
}

verifyLogin = async(req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;
        const userData = await User.findOne({email: email});

        if(userData){
            console.log(userData);

            const passwordMatch = await bcrypt.compare(password, userData.password);
            if(passwordMatch){
                
                req.session.user_id = userData._id;
                req.session.is_admin = userData.is_admin;
                if(userData.is_admin == 1){
                    res.redirect('/dashboard');
                }else{
                    res.redirect('/profile');
                }
            }
        }else{
            res.render('login', {message: 'Email and Password is incorrect!', pageTitle:'Login'});
        }

    }catch(error){
        console.log(error.message);
    }
}

const profile = (req,res)=> {
    try{
        res.send("Hello My Profile ....");
    }catch(error){
        console.log(error.message);
    }
}
const logout = async(req, res) => {
    try{
        req.session.destroy();
        res.redirect('/login');
    }catch(error){
        console.log(error.message);
    }
}

forgetPasswordForm = async(req, res)=>{
    try{
        res.render('forget-password', {pageTitle: 'Forget-Password'});
    }catch(error){
        console.log(error.message);
    }
}

forgetPassword = async(req, res) => {
    try{
        res.send('It is unavaliable!');
        const email = req.body.email;
        console.log(email)
        const userData = await User.findOne({email:email});
        if(userData){
            const randomString = randomstring.generate();
            await User.updateOne({email:email}, {$set:{token: randomString} });
            sendResetPasswordMail(userData.name, userData.email. randomstring);
            res.render('forget-password', {message:'Please check your mail to reset your password!', pageTitle: 'forget-password'})
        }else{
            res.render('forget-password', {message:'User Email is incorrect!', pageTitle: 'forget-password'});
        }
        
    }catch(error){
        console.log(error.message);
    }
}
module.exports = {
    loadLogin,
    verifyLogin,
    profile,
    logout,
    forgetPasswordForm,
    forgetPassword
}