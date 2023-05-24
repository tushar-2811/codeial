const express = require('express');
const port = 8000;

const app = express();


app.listen(port , (error)=>{
    if(error){
        console.error(`Error in running Server on port ${port}`);
    }

    console.log(`Server is Up and Running on port ${port}`);
})