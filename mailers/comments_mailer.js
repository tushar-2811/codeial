const nodeMailer = require('../config/nodemailer');


// This is another way of exporting
exports.newComment = (comment)=>{

    console.log('inside new comment mailer' , comment);
    nodeMailer.transporter.sendMail({
        from : 'social@media.com',
        to : comment.commentByUser.email,
        subject : "new comment published",
        html : '<h1> Yup, The new comment is published!!! </h1>'
    },(err,info)=>{
        if(err){
            console.log('error in sending mail',err);
            return;
        }

        console.log("mail delivered : " , info);
        return;
    })

}