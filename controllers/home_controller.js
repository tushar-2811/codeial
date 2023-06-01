const { deserializeUser } = require('passport');
const Post = require('../models/post');
const User = require('../models/user');



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
    