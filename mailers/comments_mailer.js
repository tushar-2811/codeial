const nodeMailer = require('../config/nodemailer');


// This is another way of exporting
exports.newComment = (comment)=>{

    let htmlString = nodeMailer.renderTemplate({comment : comment} , '/comments/new_comment.ejs' ,);

    nodeMailer.transporter.sendMail({
        from : 'social@media.com',
        to : comment.commentByUser.email,
        subject : "new comment published",
        html : htmlString
    },(err,info)=>{
        if(err){
            console.log('error in sending mail',err);
            return;
        }

        console.log("mail delivered : " , info);
        return;
    })

}