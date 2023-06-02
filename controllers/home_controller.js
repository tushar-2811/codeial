const { deserializeUser } = require('passport');
const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');



module.exports.home = function(req,res){

    // console.log(req.cookies);
    // res.cookie('user_id', 25);


    // Post.find({})
    // .then((posts)=>{
        
    //     return res.render('home' , {
    //         title : 'Codeial | Home',
    //         posts : posts
    //         });
    // })
    // .catch((error)=>{
    //     console.log('error in finding posts',error);
        
    // })


Post.find({})
.populate('user')
.populate({    // nested population
    path : 'commentIds',
    populate : {
     path : 'commentByUser'
    }
})
// .populate({ path: 'commentIds.user', options: { strictPopulate: false } })
.then((posts)=>{
            return res.render('home' , {
            title : 'Codeial | Home',
            posts : posts
        });
})

.catch((error)=>{
       console.log("error in finding post",error);
})
    

 

}
    