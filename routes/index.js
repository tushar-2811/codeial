// This index.js in my "routes" folder is the entry point for 
// all of my routes

const express = require("express");
const router = express.Router();



const homeController = require('../controllers/home_controller');

router.get('/' , homeController.home);

router.use('/users' , require('./users'));
router.use('/posts', require('./posts'));
router.use('/comment', require('./comment'));


router.use('/api' , require('./api'));


// for any further routes access from here
// router.use('routerName', require('./routerfile'))




module.exports = router;



//  The express.Router class is provided by the Express framework 
//  and can be used to define routes in a separate module or file.





// Using the Express Router module allows
// you to organize and modularize your routes,
// making your application more maintainable and scalable.