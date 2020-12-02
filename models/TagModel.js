//  its tag data model


const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    // _id :{
    //     type: mongoose.Schema.Types.ObjectId
    // },
    tagName: {
        type: String,
        required: true
    },
    tagLikesCount :{       
        type: Number, 
        required: false
    },
    blogsId: {        // contains name of blogs which contain this tag
        type: Array,
        default: [],
        required: false
    }
});

const TagData = mongoose.model('tagData', UserSchema)

module.exports = TagData ;