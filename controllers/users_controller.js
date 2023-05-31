
const User = require('../models/user');


module.exports.profile = (req,res)=>{
    
    return res.render('user_profile' , {
        title : "PROFILE"
    });
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
    return res.redirect('/users/profile');

}


// sign-out and destroying the session
module.exports.destroySession = (req,res)=>{
    req.logout((error)=>{
        if(error){
            console.log("error is signing-out",error);
            return res.status(500).send('Internal Server Error');
        }
        else{
            return res.redirect('/');
        }
    });
    
}


