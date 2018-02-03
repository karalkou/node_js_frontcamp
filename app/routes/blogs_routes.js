const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const BlogModel = require('../models/blog');
const remoteDbUrl = require('./../../config/db').url;
const auth = require("../controllers/AuthController.js");

mongoose.connect(remoteDbUrl)
    .then(() =>  console.log('connection succesful'))
    .catch((err) => console.error(err));
const db = mongoose.connection;

/*---------------------------------------------------------*/
/*
 * Check the request if the user is authenticated.
 * Return an error message if not, otherwise keep going :)
 */
function ensureLoggedIn() {
    return function(req, res, next) {
        // isAuthenticated is set by `deserializeUser()`
        if (!req.isAuthenticated || !req.isAuthenticated()) {
            res.status(401).send({
                success: false,
                message: 'You need to be authenticated to access this page!'
            });
            // res.redirect('/')
        } else{
            next()
        }
    }
}
/*---------------------------------------------------------*/

/**
 * GETs blogs in database.
 */
router.get('/', ensureLoggedIn(), (req, res) => {
    BlogModel.find({}).then(blogs => {
        res.send(blogs);
    });
});

/**
 * GETs blog instanace by ID.
 */
router.get('/:id', (req, res, next) => {
    BlogModel.findById(req.params.id).then(blog => {
        if (!blog) {
            let err = new Error('Not found');
            err.status = 404;
            next(err);
            return;
        }
        res.send(blog);
    }).catch(err => {
        err.status = 404;
        next(err)
    });
});

/**
 * POSTs create a blog instance
 */
router.post('/', (req, res) => {
    let blog = new BlogModel(req.body);
    blog.save().then(createdBlog => {
        res.json(createdBlog);
    })
});

/**
 * PUTs update a blog instance
 */
router.put('/:id', (req, res, next) => {
    BlogModel.findByIdAndUpdate(req.params.id, req.body, {new: true, upsert: true})
        .then(blog => {
            res.json(blog);
        }).catch(err => {
        err.status = 404;
        next(err);
    });
});

/**
 * PUTs update a blog instance
 */
router.delete('/:id', (req, res, next) => {
    BlogModel.findByIdAndRemove(req.params.id)
        .then(deletedBlog => {
            res.json({
                id: deletedBlog.id
            });
        }).catch(err => {
        err.status = 404;
        next(err);
    });
});

module.exports = router;