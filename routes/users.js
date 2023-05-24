const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile' , usersController.profile);

//  The .use method is used to register middleware functions
//  that are executed for every request, regardless of the
//  HTTP method or the requested path.


//  The .get method is specifically used to define route handlers 
//  for GET requests and is executed only when a GET request matches
//  the specified path.




module.exports = router;