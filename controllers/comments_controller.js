const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');



module.exports.create = async (req,res)=>{
    // To create a comment over a post:--- 
    // 1-> check that if the post even exist or not

    // first I need to check in the database with the post_id that ,if any post exist
    // or NOT

    // now find the post first and then create comment
    let postid = req.body.post;
    postid = postid.trim();
    console.log(postid);


    // Post.findById(postid)
    // .then((post)=>{
       
    //     // now the post is found,create the comment
    //     if(post){
    //         Comment.create({
    //             content : req.body.comment,
    //             commentOnPost : postid, // name
    //             commentByUser : req.user._id
    //         })
    //         .then((comment)=>{
    //              post.commentIds.push(comment);
    //              post.save();                  // here,we are updating something :)

    //              res.redirect('/');
    //         })
    //         .catch((error)=>{
    //             console.log("error in creating comment",error);
    //             return res.redirect('back');
    //         })
    //     }
    // })
    // .catch((error)=>{
    //     console.log("error in finding post",error);
    //     return res.redirect('back');
    // })

    // ------------------- handle with async/await-----------------

    try{
        let post = await Post.findById(postid)

        let comment = await Comment.create({
                    content : req.body.comment,
                    commentOnPost : postid, // name
                    commentByUser : req.user._id
                })

                post.commentIds.push(comment);
                post.save();   // here,we are updating something :)

                comment = await comment.populate('commentByUser' , 'name email');
                commentsMailer.newComment(comment);


                res.redirect('/');
                

                
    }
    catch(error){
        console.log("error",error);
        return res.redirect('back');
    }
}



module.exports.destroy = async (req,res)=>{

    // // to check if even the comment exist or not
    // Comment.findById(req.params.id)
    // .then((comment)=>{
    //      if(comment){
        
    //         if(comment.commentByUser == req.user.id){   // authorization to delete comment
                  
    //             // save post id so that i can delete this comment id from the commentIds of post
    //              let postId = comment.commentOnPost;  

    //              comment.deleteOne()
                 
    //              Post.findByIdAndUpdate(postId , { $pull : {commentIds : req.params.id}})
    //              .then(()=>{
    //                 console.log("deleted");
    //              })
                 
    //              return res.redirect('back');
    //         }

    //      }
    //      else{
    //            console.log('You are not authorized to delete commment');
    //            return res.redirect('back');
    //      }
    // })
    // .catch((err)=>{
    //     console.log("error in finding comment",err);
    //     return res.redirect('back');
    // })

    // -------------- handle with async/await------------
    try{
        let comment = await Comment.findById(req.params.id)

        if(comment.commentByUser == req.user.id){

            let postId = comment.commentOnPost;  
            await comment.deleteOne();     
            await Post.findByIdAndUpdate(postId , { $pull : {commentIds : req.params.id}});
            
            return res.redirect('back');
        }
        else{
            console.log('You are not authorized to delete commment');
            return res.redirect('back');
        }



    }catch(error){
        console.log("error",error);
        return res.redirect('back');
    }
}
   