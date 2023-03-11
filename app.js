const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const adminRoute = require('./routes/admin');
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const isBlog = require('./middlewares/isBlog');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log(`DB is running ${DB_URI}`));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));

app.use(isBlog.isBlog);


app.use('/', adminRoute);
app.use('/', userRoute);
app.use('/', blogRoute);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

