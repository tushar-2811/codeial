const Post = require('../../../models/post');

const Comment = require('../../../models/comment');

module.exports.index = async (req,res)=>{

    
let posts = await Post.find({})
.populate('user')
.populate({    // nested population
    path : 'commentIds',
    populate : {
     path : 'commentByUser'
    }
})

 
    return res.status(200).json({
        message : "List of Posts",
        posts : posts
    })
}


// delete post
module.exports.destroy = async (req,res)=>{

    try{
      let post = await Post.findById(req.params.id)

          if(post.user == req.user.id){

            await post.deleteOne();
    
            await Comment.deleteMany({commentOnPost : req.params.id});
         
            return res.status(200).json({
                message : "post deleted"
            })

          }
          
          else{
            return res.status(401).json({
                message : "you cannot delete this post"
            })
          }
    
    }
    catch(error){
        console.log("****error",error);
        return res.status(500).json({
            message : "Internal serve Error"
        })
    }
}