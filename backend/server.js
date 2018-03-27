const express = require('express');
const app = express();
const router = require('./router.js');
const postrouter = require('./postrouter.js');
const catrouter = require('./catrouter.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const pass = require('./passport');
const passRouter = require('./passport-router');
const passport = require('passport');
const cookieSession = require('cookie-session');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieSession({
    maxAge: 60 * 60 * 1000,
    keys: ['asdfghjkl']
}))

app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.json())
app.use(express.static(__dirname + '/uploads'));
app.use(express.static(__dirname + '/categories'));
app.use(express.static(__dirname + '/profilepic'));
mongoose.connect('mongodb://localhost:27017/newdata');
app.use('/', router);
app.use('/upload', postrouter);
app.use('/categories', catrouter);
app.use('/auth', passRouter);

var port = 8080;
app.listen(port, () => {
    console.log('the server is running on port : ' + port);
})