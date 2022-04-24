require('dotenv').config();

var express = require('express');
 var passport = require('passport');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

 var authRouter = require('./routes/auth');
var tweetsRouter = require('./routes/tweets');
var SynctweetsRouter = require('./routes/synctweets');

var app = express();

require('./boot/db')();
require('./boot/auth')();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRouter);
app.use('/tweets', tweetsRouter);
app.use('/synctweets', SynctweetsRouter);

module.exports = app;
