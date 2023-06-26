
const User = require('../models/user');
const fs = require('fs');
const path = require('path');


module.exports.profile = (req,res)=>{

    User.findById(req.params.id)
    .then((user)=>{
        return res.render('user_profile' , {
            title : "PROFILE",
            profile_user : user
            
        });
    })
    .catch((err)=>{
        console.log('error in finding profile',err);
        return res.redirect('back');
    })

    // return res.render('user_profile' , {
    //     title : "PROFILE"
    // });
    
   
}


// render the sign-up page
module.exports.signUp = (req,res)=>{

    return res.render('user_sign_up',{
        title : "Codeial | sign Up"
    });
}


// render the sign-in page
module.exports.signIn = (req,res)=>{

    return res.render('user_sign_in' , {
        title : "codeial | sign In"
    });
}




// get the sign-up data
module.exports.create = (req,res)=>{

    // password and confirm-password must be same
    if(req.body.password != req.body.confirmpassword){
        return res.redirect('back');
    }


    // check in server that the e-mail has to be unique
   User.findOne({email : req.body.email})
   .then((user)=>{
      if(user){
        console.log("user already exist");
        res.redirect('back');
      }
      else{
        User.create({
            email : req.body.email,
            name :  req.body.name,
            password : req.body.password
        })

        return res.redirect('/users/sign-in');
      }
   })
   .catch((error)=>{
      console.log("error in creatin user",error);
      return res.redirect('back');
   })



}


// sign-in and create a session for the user
module.exports.createSession = (req,res)=>{
    // console.log(req.user);
    // let userId = req.user.id;
    // console.log(userId);
    
    // return res.redirect(`/users/profile/${userId}`);
   
    req.flash('success' , 'Logged In successfully');
    return res.redirect('/');

}


// sign-out and destroying the session
module.exports.destroySession = (req,res)=>{
    
    req.logout((error)=>{
        if(error){
            console.log("error is signing-out",error);
            return res.status(500).send('Internal Server Error');
        }
        else{
            req.flash('success' , 'Logged out !');
            return res.redirect('/');
        }
    });
    
}



// to update
module.exports.update = async (req,res)=>{

    // if(req.user.id == req.params.id){
       
    //     User.findByIdAndUpdate(req.params.id , {email : req.body.email , name : req.body.name})
    //     .then((user)=>{
    //         return res.redirect('back');
    //     })
        
    // }
    // else{
    //     return res.status(401).send('Unauthorized');
    // }

    if(req.user.id == req.params.id){
        try{
             let user = await User.findById(req.params.id);

             User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('multer error',err);
                    return res.redirect('back');
                }

                // console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;
                
                // if the user id uploading a file
                if(req.file){

                    if(user.avatar && fs.existsSync(path.join(__dirname , '..' + user.avatar))){
                        fs.unlinkSync(path.join(__dirname , '..' , user.avatar));

                    }



                    user.avatar = User.avatarPath + '/' + req.file.filename;
                    // this is saving the path of the uploaded file in the avatar
                    // field of the user
                }
                user.save();
                return res.redirect('back');
             })
        }
        catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
      
        
    }
    else{
        req.flash('error','unauthorized');
        return res.status(401).send('Unauthorized');
    }

    
}


