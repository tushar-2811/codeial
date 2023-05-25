const express = require('express');
const port = 8000;
const app = express();

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






app.listen(port , (error)=>{
    if(error){
        console.error(`Error in running Server on port ${port}`);
    }

    console.log(`Server is Up and Running on port ${port}`);
})