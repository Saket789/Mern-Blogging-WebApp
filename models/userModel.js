const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id :{
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    blogs: {
        type: Array,
        default: [],
        required: false
    },
    likedBlogs : {
        type: Array,
        default: [],
        required: false
    },
    disLikedBlogs: {
        type: Array,
        default: [],
        required: false
    }
});

const User = mongoose.model('User', UserSchema)

module.exports = User;