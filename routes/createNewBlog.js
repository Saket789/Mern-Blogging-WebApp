const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const TagData = require('../models/TagModel')


/**
 * Router to create new blog here we are doing 3 things
 * 1. store data in blog's collections
 * 2. store blog id in the authors blog array
 * 3. store blog id in tag's blog array
 */
router.post('/', (req, res) => {
    // creating new blog by fetching data from request
    const blog = new Blog({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        author: req.body.author,
        authorId: req.body.authorID,
        body: req.body.body,
        tags: JSON.parse(req.body.tagString).tags
    })

    // check if that author already exists in database
    // if yes 
    //     we have to update users collection 
    // else 
    //     we have to create new user 
    User.find({ _id: blog.authorId })
        .exec()
        .then(author => {

            if (author.length === 1) { // author already exist in db

                const prevUser = author[0]
                prevUser.blogs.push(blog._id)
                User.updateOne({ _id: prevUser._id }, { blogs: prevUser.blogs })
                    .catch(err => console.log(err))

            }
            else { // new author case

                const user = new User({
                    _id: blog.authorId,
                    name: blog.author,
                    blogs: [blog._id]
                })

                user.save()
                    .catch(err => console.log(err))

            }
        })

    blog.tags.forEach(element => {
        TagData.find({ tagName: element })
            .exec()
            .then(blogsId => {
                if (blogsId.length === 1) {
                    const prevTag = blogsId[0]
                    prevTag.blogsId.push(blog._id)
                    TagData.updateOne({ tagName: prevTag.tagName }, { blogsId: prevTag.blogsId })
                        .catch(err => console.log(err))
                }
                else {
                    const tagData = new TagData({
                        tagName: element,
                        blogsId: [blog._id],
                        tagLikesCount: 1
                    })
                    tagData.save()
                        .catch(err => console.log(err))
                }
            })
    })


    blog.save().then(() => {
        res.redirect(`/blog/${blog._id}`)
    })
        .catch(err => {
            console.log(err)
            res.send('<h1>Something Went wrong, sorry</h1>')
        })
})


module.exports = router