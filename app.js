var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var gamesRouter = require('./routes/game');
var actionsRouter = require('./routes/action');

var app = express();

require('dotenv').config();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/game', gamesRouter);
app.use('/action', gamesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

app.use(function(err, req, res, next) {
    // Set the response status code
    res.status(err.status || 500);

    // Check if the environment is development to provide more detailed error
    if (req.app.get('env') === 'development') {
        res.send(err.message); // Send text error message in development
        // Or send a JSON response with error details
        // res.json({ message: err.message, error: err });
    } else {
        res.send('An error occurred'); // Send a generic message in production
        // Or send a JSON response without detailed error
        // res.json({ message: 'An error occurred' });
    }
});

module.exports = app;