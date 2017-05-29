'use strict';
let exec = require('child_process').exec;

  
exports.handler = function(event, context, callback) {
    if (!event.cmd) {
        
        
    console.log('Spam filter');
    
    var sesNotification = event.Records[0].ses;
    console.log("SES Notification:\n", JSON.stringify(sesNotification, null, 2));
 
    // Check if any spam check failed
    if (sesNotification.receipt.spfVerdict.status === 'FAIL'
            || sesNotification.receipt.dkimVerdict.status === 'FAIL'
            || sesNotification.receipt.spamVerdict.status === 'FAIL'
            || sesNotification.receipt.virusVerdict.status === 'FAIL') {
        console.log('Dropping spam');
        // Stop processing rule set, dropping message
        callback(null, {'disposition':'STOP_RULE_SET'});
    } else {
        callback(null, null);   
    }
    
    
    console.log("Get Email Template");
    
    // Retrieve the email from your bucket
    s3.getObject({
        Bucket: "benchbrewing.dev.massminority.com",
        Key: sesNotification.mail.messageId
    }, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            callback(err);
        } else {
            console.log("Raw email:\n" + data.Body);
            
            // Custom email processing goes here
            
            callback(null, null);
        }
    });
   
};



var aws = require('aws-sdk');
var ses = new aws.SES({
   accessKeyId: 'AKIAJIAAQ5XLH6PRJYLQ',
   secretAccesskey: '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',
   region: 'us-west-2' 
});



exports.handler = function(event, context) {
    console.log("Incoming: ", event);
    var output = querystring.parse(event);

    var eParams = {
        Destination: {
            ToAddresses: ["chris@massminority.com"]
        },
        Message: {
            Body: {
                Text: {
                    Data: output.message
                }
            },
            Subject: {
                Data: "Ses Test Email"
            }
        },
        Source: "website@benchbrewing.com"
    };

    console.log('===SENDING EMAIL===');
    var email = ses.sendEmail(eParams, function(err, data){
        if(err) console.log(err);
        else {
            context.succeed(event);
            console.log("===EMAIL SENT===");
            console.log(data);
        }
    });
    console.log("EMAIL CODE END");
    console.log('EMAIL: ', email);
    
};