let AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = function (event, context, callback) {

    let receiver = event['receiver'];
    let sender = event['sender'];
    let message = event['message'];

    console.log("Sending message", message, "to receiver", receiver);

    sns.publish({
        Message: message,
        MessageAttributes: {
            'AWS.SNS.SMS.SMSType': {
                'DataType': 'String',
                'StringValue': 'Transactional'
            },
            'AWS.SNS.SMS.SenderID': {
                'DataType': 'String',
                'StringValue': sender
            }
        },
        PhoneNumber: receiver
    }).promise()
        .then(data => {
            console.log("Sent message to", receiver);
			callback(null, data);
            // your code goes here
        })
        .catch(err => {
   			console.log("Sending failed", err);
			callback(err);         
            // error handling goes here
        });


    callback(null, { "message": "Successfully executed" });
}