const express = require('express')
const router = express.Router()

const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const Tag = require('../models/TagModel')


/**
 * Router to like request for a blog
 * does following things:
 * 1. checks if already likes 
 * 2. if already dislikes, make it like
 * 3. else like
 * 
 * we have to update all 3 tables if someone likes a blog
 * 1. update that blog's like count
 * 2. add that blog in user's liked blog list
 * 3. update like count of all tags associated to that blog 
 * 
 */

router.post('/', (req, res) => {
    /**
 * here request will contain 2 fields
 * 1. blog id
 * 2. user id
 * 3. list of tags
 */
    const request = JSON.parse(Object.keys(req.body)[0])

    /**  
     * Also there are two cases 
     * 1. user already exists in databse 
     * 2. does not exists
     */
    User.find({ _id: request.userId })
        .exec()
        .then(dbResponseUser => {
            if (dbResponseUser.length === 1) { // if user exists in database

                /**
                 * There are 3 cases
                 * 1. already likes the blog
                     * 2. dislikes the blog
                     * 3. otherwise
                     */
                let alreadyLikesBlog = dbResponseUser[0].likedBlogs.includes(request.blogId)
                let dislikesBlog = dbResponseUser[0].disLikedBlogs.includes(request.blogId)

                if (alreadyLikesBlog) {
                    res.json({  // sending -1 as a flag to do nothing
                        likes: -1,
                        dislikes: -1
                    })

                }
                else if (dislikesBlog) {
                    // TODO: update likes count of blog and all tags 
                    User.findOneAndUpdate({ _id: request.userId }, {
                        $push: {
                            likedBlogs: request.blogId
                        },
                    },
                        { upsert: true }
                    )
                        .catch(err => console.log(err))


                    User.findOneAndUpdate({ _id: request.userId }, {
                        $pull: {
                            disLikedBlogs: request.blogId
                        },
                    },
                        { upsert: true }
                    )
                        .catch(err => console.log(err))

                    Blog.find({ _id: request.blogId })
                        .then(blog => {
                            blog[0].tags.forEach(tag => {
                                Tag.findOneAndUpdate({ tagName: tag }, {
                                    $inc: {
                                        tagLikesCount: 2
                                    }
                                })
                            })
                        })


                    Blog.findOneAndUpdate({ _id: request.blogId }, {
                        $inc: {
                            likes: 1,
                            dislikes: -1
                        }
                    },
                        {
                            new: true
                        })
                        .then(_ => {
                            res.json({
                                likes: _.likes,
                                dislikes: _.dislikes
                            })
                        })
                        .catch(err => console.log(err))

                }
                else {
                    User.findOneAndUpdate({ _id: request.userId }, {
                        $push: {
                            likedBlogs: request.blogId
                        }
                    },
                        { upsert: true }
                    )
                        .catch(err => console.log(err))

                    // for updating likes in tags
                    Blog.find({ _id: request.blogId })
                        .then(blog => {
                            blog[0].tags.forEach(tag => {
                                Tag.findOneAndUpdate({ tagName: tag }, {
                                    $inc: {
                                        tagLikesCount: 1
                                    }
                                }, {new: true})
                            })
                        })
                        .catch(err => console.log(err))
                        

                    Blog.findOneAndUpdate({ _id: request.blogId }, {
                        $inc: {
                            likes: 1,
                        }
                    },
                        {
                            new: true
                        })
                        .then(_ => {
                            res.json({
                                likes: _.likes,
                                dislikes: _.dislikes
                            })
                        })
                        .catch(err => console.log(err))
                }
            }
            else { // for new user
                const user = new User({
                    _id: request.userId,
                    likedBlogs: [request.blogId]
                })
                user.save()


                Blog.find({_id: request.blogId})
                .then(blog => {
                    blog[0].tags.forEach(tag => {
                        Tag.findOneAndUpdate({tagName: tag}, {
                            $inc: {
                                tagLikesCount : 1
                            }
                        })
                    })
                })
                .catch(err => console.log(err))

                Blog.findOneAndUpdate({ _id: request.blogId }, {
                    $inc: {
                        likes: 1,
                    }
                },
                    {
                        new: true
                    })
                    .then(_ => {
                        res.json({
                            likes: _.likes,
                            dislikes: _.dislikes
                        })
                    })
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))

})

module.exports = router