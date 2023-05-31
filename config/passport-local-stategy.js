const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;


// authentication using passport
passport.use(new LocalStrategy({
      usernameField : 'email'          // Treat email as username
    },
    function(email,password,done){
         // find the user and establish the identity
         User.findOne({email : email})
         .then((user)=>{
            if(!user || user.password != password){
                console.log("invalid username | password");
                return done(null,false);
            }
            else{
                return done(null,user);
            }

         })
         .catch((error)=>{
            console.log("error in finding user",error);
            return done(error);
         })

    }   
));


// serializing the user to decide which key is to be kept in the cookie
passport.serializeUser((user,done)=>{
     return done(null,user.id);
});


// de-serializing the user from key in the cookie
passport.deserializeUser((id,done)=>{
    User.findById(id)
    .then((user)=>{
        return done(null,user);
    })
    .catch((err)=>{
        console.log("error in finding the user--> passport",err);
        return done(err);

    });

});


// check if the user is authenticated
passport.checkAuthentication = function(req,res,next){

    // if the user is authenticated(signed-in) then pass on the request to controllers
    if(req.isAuthenticated()){
        return next();
    }
    
    // if user is not signed-in
    else{
        return res.redirect('/users/sign-in');
    }
}


passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookies, and we
        // are just sending this to locals for the views
        res.locals.user = req.user;
    }
    next();
}




module.exports = passport;