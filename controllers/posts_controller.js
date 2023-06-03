const Post = require('../models/post');
const Comment = require('../models/comment');
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




module.exports.destroy = (req,res)=>{

     Post.findById(req.params.id)
     .then((post)=>{
          if(post){

            // I cant delete anyone's posts ----- post.user => id of the post creater
            // .id means converting the object id into string
            if(post.user == req.user.id){
                post.deleteOne()

                Comment.deleteMany({commentOnPost : req.params.id})
                .then(()=>{
                    return res.redirect('back');
                })
                .catch((err)=>{
                    console.log("error is deleteing comments",err);
                    return res.redirect('back');
                })

            }
            else{
                console.log('User not authorized to delete post');
                return res.redirect('back');
            }

          }
          else{
            console.log("Post not found");
            return res.redirect('back');
          }
     })
     .catch((err)=>{
        console.log("error in finding post",err);
        return red.redirect('back');
     })
}