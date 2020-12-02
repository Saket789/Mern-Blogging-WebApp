const express = require('express')
const router = express.Router()

const Tag = require('../models/TagModel')

const trendingTagsCache = {
    tags: [],
    timeStamp: Date.now()
}


router.get('/', (req, res) => {
    
    // convert miliseconds in hours
    let timePassed = (Date.now() - trendingTagsCache.timeStamp) / (1000 * 3600)
    let shouldFetch = (timePassed > 1 || trendingTagsCache.tags.length === 0)
    // we will fetch only if one hour is passed or this is first time

    if(shouldFetch)
    {
        Tag.find({}).then(tagData => {
            tagData.sort((a, b) => {
                return b.blogsId.length - a.blogsId.length
            }) // sort all blogs
            var trendingTags = []
            for (var i = 0; i < 12; i++)
                trendingTags.push(tagData[i].tagName) // fetch first 14 trending tags 
            
            trendingTagsCache.timeStamp = Date.now()
            trendingTagsCache.topics = trendingTags          
            res.status(200).json(trendingTagsCache)
        })
    }
    else
    {
        res.status(200).json(trendingTopicsCache)
    }

})


module.exports = router