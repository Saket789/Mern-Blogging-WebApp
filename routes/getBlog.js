const express = require('express')
const router = express.Router()

const Blog = require('../models/blogModel')


/**
 * Router to send a particular blog
 */
router.get('/:blogId', (req, res) => {
    Blog.find({ _id: req.params.blogId })
        .exec()
        .then(blog => {
            res.status(200).json(blog[0])
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})


module.exports = router