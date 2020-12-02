const express = require('express')
const router = express.Router()

const Blog = require('../models/blogModel')
const User = require('../models/userModel')

const popularAuthorCache = {
    authors: [],
    timeStamp: Date.now()
}


// convert miliseconds in hours
    router.get('/', async (req, res) => {
    let timePassed = (Date.now() - popularAuthorCache.timeStamp) / (1000 * 3600)
    let shouldFetch = (timePassed > 1 || popularAuthorCache.authors.length === 0)
    // we will fetch only if one hour is passed or this is first time

    if (shouldFetch) {
        const blogLikes = {}
        Blog.find({})
            .then(blog => {
                blog.forEach(b => {
                    let id = b._id
                    blogLikes[id] = ((b.likes)-b.dislikes)
                })
                User.find({}).then(authors => {
                    let authorWithLikes =  authors.map(au => {
                        let auLikes = 0
                        au.blogs.forEach(bg => {
                            auLikes += blogLikes[bg]
                        })
                        let au1 = {
                            name: au.name, 
                            likeCount: auLikes,
                            blogs: au.blogs.length
                        }
                        return au1
                    })
                    authorWithLikes.sort((a, b) => {  
                        return b.likeCount - a.likeCount
                    })

                    let popularAuthors = []
                    for(let i = 0; i < 5; i++)
                        popularAuthors.push(authorWithLikes[i])

                    popularAuthorCache.authors = popularAuthors
                    popularAuthorCache.timeStamp = Date.now()
                    res.send(popularAuthorCache)
                })
            })
    }
    else {
        // send from cached data
        res.status(200).json(popularAuthorCache)
    }
})


module.exports = router