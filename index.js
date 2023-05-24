const express = require('express');
const port = 8000;
const app = express();



//----------- use express router -------------
const router = require('./routes/index');
app.use('/', router);







app.listen(port , (error)=>{
    if(error){
        console.error(`Error in running Server on port ${port}`);
    }

    console.log(`Server is Up and Running on port ${port}`);
})