const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile' ,passport.checkAuthentication , usersController.profile);
// passport.checkAuthentication will not allow to access this page until the user is not authenticated


router.get('/sign-up', usersController.signUp);

router.get('/sign-in',usersController.signIn);


router.post('/create' , usersController.create);
   

//  The .use method is used to register middleware functions
//  that are executed for every request, regardless of the
//  HTTP method or the requested path.


//  The .get method is specifically used to define route handlers 
//  for GET requests and is executed only when a GET request matches
//  the specified path.





// use passport as the middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect : '/users/sign-in'}

) ,usersController.createSession);


router.get('/sign-out' , usersController.destroySession);





module.exports = router;