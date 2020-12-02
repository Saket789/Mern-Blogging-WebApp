const express = require('express')
const router = express.Router()

const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const TagData = require('../models/TagModel')

router.get('/', (req, res) => {
    Blog.find({})
        .then(blog => {
            res.json(blog)
        })
        .catch(err => console.log(err))

})


module.exports = router