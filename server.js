const express = require('express');
// eslint-disable-next-line no-unused-vars
const mongoose = require('./db/mongoose');
const bodyParser = require('body-parser');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let createError = require('http-errors');
const errorController = require('./controllers/error');
const cors = require('cors');
const userRoutes = require('./routes/user-routes');
const privateRoutes = require('./routes/private');
const fiRoutes = require('./routes/financial-institution-routes');
const accountRoutes = require('./routes/account-routes');
let app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
require('dotenv').config();
app.get('/', (req, res) => {
	res.send('welcome');
});
app.use('/api/auth', userRoutes);
app.use('/auth-private', privateRoutes);
app.use('/api/fi', fiRoutes);
app.use('/api/account', accountRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(406));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});
app.use(errorController.get404);

module.exports = app;
