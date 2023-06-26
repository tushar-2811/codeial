// const { response } = require("express");

// let createPost = function(){
//     // selecting the Post-form
//     let newPostForm = document.querySelector('#new-post-form');


//     // adding event 
//     newPostForm.addEventListener('submit' , (event)=>{

//         event.preventDefault();
//         const formData = new FormData(newPostForm);

//         const data = Object.fromEntries(formData);
//         // console.log(data);

//         fetch('/posts/create' , {
//             method : 'POST',
//             headers : {
//                 'Content-Type' : 'application/json'
//             },
//             body : JSON.stringify(data)
//         })
//         .then((res)=>{
//             return res.text();
//         })
//         .then((data)=>{
//             console.log(data);
//         })

//     })  
     
// }

// createPost();

        

