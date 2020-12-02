const express = require('express')
const router = express.Router()

const Blog = require('../models/blogModel')


/**
 * In landing page we requrie 8 trending topics to show 
 * for this we have to triverse through all blogs and find top 8 blogs
 * 
 * this process is time consuming, here we are doing this process hourly and
 * storing that data in an object
 * So we will perform this operation one in an hour
 */
const trendingBlogsCache = {
    blogs: [],
    timeStamp: Date.now()
}



router.get('/', (req, res) => {

    // convert miliseconds in hours
    let timePassed = (Date.now() - trendingBlogsCache.timeStamp) / (1000 * 3600)
    let shouldFetch = (timePassed > 1 || trendingBlogsCache.blogs.length === 0)
    // we will fetch only if one hour is passed or this is first time


    if (shouldFetch) {

        Blog.find({}).then(blog => {

            // sort all blogs
            blog.sort((a, b) => {
                return b.likes - a.likes
            })

            // fetch first 8 trending topics 
            var trendingBlogs = []
            for (var i = 0; i < 8; i++)
                trendingBlogs.push(blog[i])


            // store before sending
            trendingBlogsCache.blogs = trendingBlogs
            trendingBlogsCache.timeStamp = Date.now()


            res.status(200).json(trendingBlogs)
        })
    }
    else {

        // send from cached data
        res.status(200).json(trendingBlogsCache.blogs)
    }
})


module.exports = router