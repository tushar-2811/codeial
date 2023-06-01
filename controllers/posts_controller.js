const Post = require('../models/post');
const passport = require('passport');

module.exports.create = (req,res)=>{
    Post.create({
        content : req.body.content,
        user : req.user._id
    })
    .then((post)=>{
       return res.redirect('back');
    })
    .catch((error)=>{
        console.log("error in posting",error);
        return res.redirect('back');
    })
}