const Comment = require('../models/comment');
const Post = require('../models/post');



module.exports.create = (req,res)=>{
    // To create a comment over a post:--- 
    // 1-> check that if the post even exist or not

    // first I need to check in the database with the post_id that ,if any post exist
    // or NOT

    // now find the post first and then create comment
    let postid = req.body.post;
    postid = postid.trim();
    console.log(postid);
    Post.findById(postid)
    .then((post)=>{
       
        // now the post is found,create the comment
        if(post){
            Comment.create({
                content : req.body.comment,
                commentOnPost : postid, // name
                commentByUser : req.user._id
            })
            .then((comment)=>{
                 post.commentIds.push(comment);
                 post.save();                  // here,we are updating something :)

                 res.redirect('/');
            })
            .catch((error)=>{
                console.log("error in creating comment",error);
                return res.redirect('back');
            })
        }
    })
    .catch((error)=>{
        console.log("error in finding post",error);
        return res.redirect('back');
    })

}
   