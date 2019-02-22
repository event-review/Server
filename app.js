var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var promotorRouter = require('./routes/promotor');
var eventRouter = require('./routes/event');
var beforeEventRouter = require('./routes/beforeEvent');
var afterEventRouter = require('./routes/afterEvent');

var app = express();

// app.use(logger('dev'));
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
