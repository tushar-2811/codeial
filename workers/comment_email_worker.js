const queue = require('../config/kue');

const commentMailer = require('../mailers/comments_mailer');

// This worker should be called instead of function directly 
queue.process('emails' , function(job,done){
    console.log('emails worker is processing a job::',job.data);

    commentMailer.newComment(job.data);
    done();
})