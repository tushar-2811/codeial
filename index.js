const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8001;
const app = express();
const db = require('./config/mongoose');
const path = require('path');


// const sassMiddleware = require('node-sass-middleware');


// app.use(sassMiddleware({
//     src: path.join(__dirname, 'assets', 'scss'),
//     dest: path.join(__dirname, 'assets', 'css'),
//     debug : true,
//     outputStyle : 'extended',
//     prefix : '/css'

// }));

const flash = require('connect-flash');
const customMware = require('./config/middleware');





// used for session cookies and authentication
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-stategy');
const passportJWT = require('./config/passport-jwt-strategy');

const mongoStore = require('connect-mongodb-session')(session);


// body-parser
app.use(express.urlencoded());


// cookie-parser
app.use(cookieParser());


// --- using static files in my application like CSS & javscript & images etc..---
app.use(express.static('./assets'));

// make the upload path available to the browser
app.use('/uploads' , express.static(__dirname + '/uploads'));

// ---- including express Layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);



// extract style and scripts from sub-pages into the layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);



//----------- use express router -------------
const router = require('./routes/index');


// ---------- setting our view-engine and views ---------
app.set('view engine','ejs');
app.set('views' , './views');


// mongostore is used to store the session cookie in the mongoDB

// app.use(session({
//     name : 'codeial',
//     secret: 'blahsomething',
//     saveUninitialized : false,
//     resave : false,
   
//     store : new MongoDBStore({
//         uri : 'mongodb://127.0.0.1/test',
//         collection : 'mySessions'
//     })
// }));

app.use(session({
    name : 'codeial',
    secret : 'blahsomething',
    cookie : {
        maxAge : 1000 * 60 * 100
    },
    store : new mongoStore({
        uri : 'mongodb://127.0.0.1/test',
        collection : 'mySessions'
    }),
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(customMware.setFlash);


// This function is automatically called as middleware, whenever the app gets initialized
app.use(passport.setAuthenticatedUser);

app.use('/', router);











app.listen(port , (error)=>{
    if(error){
        console.error(`Error in running Server on port ${port}`);
    }

    console.log(`Server is Up and Running on port ${port}`);
})