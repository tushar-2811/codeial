const Post = require('../models/post');
const Comment = require('../models/comment');
const passport = require('passport');

module.exports.create = async (req,res)=>{
    // Post.create({
    //     content : req.body.content,
    //     user : req.user._id
    // })
    // .then((post)=>{
    //    return res.redirect('back');
    // })
    // .catch((error)=>{
    //     console.log("error in posting",error);
    //     return res.redirect('back');
    // })

    // ----------- Handle Promises with async/await

    try{
            await Post.create({
            content : req.body.content,
            user : req.user._id
        })

       
        req.flash('success','Post published');
        // return res.redirect('back');
    }
    catch(error){
        console.log("error in posting",error);
         return res.redirect('back');
    }
}




module.exports.destroy = async (req,res)=>{

    //  Post.findById(req.params.id)
    //  .then((post)=>{
    //       if(post){

    //         // I cant delete anyone's posts ----- post.user => id of the post creater
    //         // .id means converting the object id into string
    //         if(post.user == req.user.id){
    //             post.deleteOne()

    //             Comment.deleteMany({commentOnPost : req.params.id})
    //             .then(()=>{
    //                 return res.redirect('back');
    //             })
    //             .catch((err)=>{
    //                 console.log("error is deleteing comments",err);
    //                 return res.redirect('back');
    //             })

    //         }
    //         else{
    //             console.log('User not authorized to delete post');
    //             return res.redirect('back');
    //         }

    //       }
    //       else{
    //         console.log("Post not found");
    //         return res.redirect('back');
    //       }
    //  })
    //  .catch((err)=>{
    //     console.log("error in finding post",err);
    //     return red.redirect('back');
    //  })


    //  ------------------ Handle with async/await-----------
    try{
      let post = await Post.findById(req.params.id)

      if(post.user == req.user.id){
           await post.deleteOne()
    
           await Comment.deleteMany({commentOnPost : req.params.id})
           req.flash('success','post deleted');
           return res.redirect('back');
      }
      else{
            console.log('User not authorized to delete post');
            req.flash('error','User not authorized to delete');

            return res.redirect('back');
        }
    }
    catch(error){
        req.flash('error',error);
        return red.redirect('back');
    }
}