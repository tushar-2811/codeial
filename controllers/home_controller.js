const passport = require('passport');
const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');



module.exports.home = async function(req,res){

//               ------------ Basic -----------
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
  
    //   ----------------- populate-------------

// Post.find({})
// .populate('user')
// .populate({    // nested population
//     path : 'commentIds',
//     populate : {
//      path : 'commentByUser'
//     }
// })
// // .populate({ path: 'commentIds.user', options: { strictPopulate: false } })
// .then((posts)=>{
         
//      // find all the users
//      User.find({})
//      .then((users)=>{
//         return res.render('home' , {
//             title : 'Codeial | Home',
//             posts : posts,
//             all_users : users
//         });
//      })



            
// })

// .catch((error)=>{
//        console.log("error in finding post",error);
// })





//                 ------------ handling "PROMISES" with async/await ---------------

try{

let posts = await Post.find({})
.populate('user')
.populate({    // nested population
    path : 'commentIds',
    populate : {
     path : 'commentByUser'
    }
})

let users = await User.find({});

return res.render('home' , {
        title : 'Codeial | Home',
        posts : posts,
        all_users : users
    });

}catch(err){
    console.log("error in finding post",error);
    return;
}




    

 

}
    