var msg91 = require('msg91-sms');
var authkey='207673APLfV448z2pm5ac59c37';
 
 
//Sender ID 
var senderid='startu';
 
//Route 
var route=4;
 
//Country dial code 
var dialcode='91';
 
 
//send to single number 

var sendmessage= function(no,mssg,callback){

msg91.sendOne(authkey,no,mssg,senderid,route,dialcode,function(response){
console.log(response); 
//Returns Message ID, If Sent Successfully or the appropriate Error Message 
if(response=='Please Enter valid mobile no')
	return callback({status:false});
else
	return callback({status:true});
});
};
module.exports = sendmessage;