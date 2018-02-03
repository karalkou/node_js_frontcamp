const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const BlogModel = require('../models/blog');

mongoose.connect('mongodb://localhost:27017/procrm_site');
const db = mongoose.connection;

/**
 * GETs blogs in database.
 */
router.get('/', (req, res) => {
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