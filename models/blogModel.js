const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const BlogSchema = mongoose.Schema({
    
    _id:{
        type: ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    addedOn: {
        type: Date,
        default: Date.now,
    },
    likes:{
        type: Number,
        default: 0,
    },
    dislikes:{
        type: Number,
        default: 0,
    }, 
    tags:{
        type: Array,
        default: [],
    }
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;