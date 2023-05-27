const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8001;
const app = express();


// body-parser
app.use(express.urlencoded());


// cookie-parser
app.use(cookieParser());


// --- using static files in my application like CSS & javscript & images etc..---
app.use(express.static('./assets'));

// ---- including express Layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);



// extract style and scripts from sub-pages into the layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);



//----------- use express router -------------
const router = require('./routes/index');
app.use('/', router);


// ---------- setting our view-engine and views ---------
app.set('view engine','ejs');
app.set('views' , './views');


// ----mongodb database ----
const db = require('./config/mongoose');















app.listen(port , (error)=>{
    if(error){
        console.error(`Error in running Server on port ${port}`);
    }

    console.log(`Server is Up and Running on port ${port}`);
})