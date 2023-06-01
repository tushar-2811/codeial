const mongoose = require('mongoose');
const Post = require('./post');
const User = require('./user');



const commentSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    // comment on which post
    commentOnPost : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    },
    // comment belong to the user
    commentByUser : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }

},{
    timestamps : true
});


const Comment = mongoose.model('Comment',commentSchema );

module.exports = Comment;
