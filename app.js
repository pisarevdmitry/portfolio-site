var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('./api/models/db'); // Подключаем БД

const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var index = require('./routes/index');
var indexApi = require('./api/routes/index');
var app = express();
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*');
    res.append("Access-Control-Allow-Headers","content-type");
    res.append("Access-Control-Allow-Methods","*");
    res.append("Access-Control-Allow-Credentials","true");
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: 'loftschool',
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: null
    },
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', indexApi);

const isAdmin = (req, res, next) => {
    // если в сессии текущего пользователя есть пометка о том, что он является
    // администратором
    console.log(req.session.isAdmin);
    if (req.session.isAdmin) {
        //то всё хорошо :)
        return next();
    }
    //если нет, то перебросить пользователя на главную страницу сайта
    res.redirect('/');
};

app.use("/adminPanel" ,isAdmin,(req,res) =>{
  res.sendFile(path.resolve(__dirname,"./public","adminPanel.html"))
});

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

module.exports = app;
