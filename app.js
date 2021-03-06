'use strict'

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
//var users = require('./routes/users');

var app = express();

app.disable('x-powered-by');
var handlebars = require('express-handlebars').create({
	//defaultLayout: 'index'
});
app.set('port', process.env.PORT || 3000);
// view engine setup
app.set('views', path.join(__dirname, '/views/'));
app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars.engine);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public/')));

app.use('/', index);
app.use('/home', index);
app.use('/staff', index);
app.use('/logout', index);
app.use('/tenants', index);
app.use('/applications', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.listen(app.get('port'), function(){
  console.log("Listening to port " + app.get('port'));
})
module.exports = app;
