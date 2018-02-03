const path         = require('path');
const fs           = require('fs');
const express      = require('express');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const logger       = require('morgan');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; // Username and password authentication strategy for Passport and Node.js.

const index = require('./app/routes/index');
const blogs = require('./app/routes/blogs_routes');

const app  = express();
const port = 8000;

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'pug');

// create a write stream (in append mode)
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'app/access.log'), {flags: 'a'});
app.use(logger('combined', {stream: accessLogStream}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.listen(port, () => {
    console.log('We are live on ' + port);
});


app.use('/', index);
app.use('/blogs', blogs);

// passport configuration
const User = require('./app/models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
/*app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});*/

app.use(function(err, req, res, next) {
    const errStatus = err.status;
    res.locals.message = err.message;
    res.locals.error = {
        status: errStatus
    };

    // render the error page
    res.status(err.status || 500);
    res.render('error', { status: err.status });
});