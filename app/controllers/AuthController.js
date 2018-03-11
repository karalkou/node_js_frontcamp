const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../models/User");

const userController = {};

// Restrict access to root page
userController.home = function (req, res) {
    console.log('*** home');
    res.render('index', {
        title: 'Keep calm and be Expressed',
        greet: 'this wonderful world',
        user: req.user
    });
};

// Go to registration page
userController.register = function (req, res) {
    console.log('*** register');
    res.render('register');
};

// Post registration
userController.doRegister = function (req, res) {
    console.log('*** doRegister');
    User.register(
        new User({
            username: req.body.username,
            name: req.body.name
        }),
        req.body.password,
        function (err, user) {
            if (err) {
                return res.render('register', { user: user });
            }

            passport.authenticate('local')(req, res, function () {
                res.redirect('/');
            });
        }
    );
};

// Post registration for react app
userController.doRegisterReact = function (req, res, next) {
    console.log('*** doRegisterReact');
    User.findOne({ username: req.body.username }, (err, user) => {
        // is email address already in use?
        if (user) {
            res.json({ success: false, message: "Email is already in use" });
            return undefined;
        }
        // go ahead and create the new user
        else {
            User.register(
                new User({username: req.body.username}),
                req.body.password,
                function (err, user) {
                    if (err) {
                        console.error(err);
                        res.json({ success: false, message: "User is already registered" });
                        return undefined;
                    }
                    res.json({ success: true, message: 'authentication succeeded', user: user.username });
                }
            );
        }
    })
};

// Go to login page
userController.login = function (req, res) {
    console.log('*** login');
    res.render('login');
};

// Post login
userController.doLogin = function (req, res, next) {
    console.log('*** doLogin');
    passport.authenticate('local')(req, res, function () {
        res.redirect('/');
    });
};

// Post login for react app
userController.doLoginReact = function (req, res, next) {
    console.log('*** doLoginReact');
    passport.authenticate(
        'local',
        function (err, user, info) {

            if (err) return next(err);

            if (!user) {
                return res.json({ success: false, message: info.message })
            }
            // ***********************************************************************
            // "Note that when using a custom callback, it becomes the application's
            // responsibility to establish a session (by calling req.login()) and send
            // a response."
            // Source: http://passportjs.org/docs
            // ***********************************************************************
            // Passport exposes a login() function on req (also aliased as logIn())
            // that can be used to establish a login session
            req.logIn(user, loginErr => {
                if (loginErr) {
                    return res.json({ success: false, message: loginErr })
                }
                return res.json({ success: true, message: "authentication succeeded",  user: user.username })
            })
        }
    )(req, res, next);
};

// logout
userController.logout = function (req, res) {
    console.log('*** logout');
    req.logout();
    res.redirect('/');
};

// logout
userController.logoutReact = function (req, res) {
    console.log('*** logoutReact');
    req.logout();
    return res.json({ success: true });
};

module.exports = userController;