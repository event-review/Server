var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
var cors = require('cors')
const mongoose = require('mongoose');
mongoose.connect('mongodb://eventreview123:eventreview123@eventreview-shard-00-00-ybagi.mongodb.net:27017,eventreview-shard-00-01-ybagi.mongodb.net:27017,eventreview-shard-00-02-ybagi.mongodb.net:27017/test?ssl=true&replicaSet=eventreview-shard-0&authSource=admin&retryWrites=true');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var promotorRouter = require('./routes/promotor');
var eventRouter = require('./routes/event');
var beforeEventRouter = require('./routes/beforeEvent');
var afterEventRouter = require('./routes/afterEvent');

var app = express();

// app.use(logger('dev'));
require('dotenv').config()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/promotors', promotorRouter);
app.use('/events', eventRouter);
app.use('/beforeEvent', beforeEventRouter);
app.use('/afterEvent', afterEventRouter);

module.exports = app;
