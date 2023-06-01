const mongoose = require('mongoose');
const User = require('./user');
const Comment = require('./comment');


const postSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    // include the array of the id's of all the comments on that post
    commentIds : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comment' 
        }
    ]

},{
    timestamps : true
});



const Post = mongoose.model('Post',postSchema);

module.exports = Post;