var msg91 = require('msg91-sms');
var authkey='206854A1h65e1P7V5abe6fad';
 
//for single number 
var number='9958005393';
 
//message 
var message='your idea scissors has been selected for the startup meet';
 
//Sender ID 
var senderid='lm10pulkit';
 
//Route 
var route=4;
 
//Country dial code 
var dialcode='91';
 
 
//send to single number 
 
msg91.sendOne(authkey,number,message,senderid,route,dialcode,function(response){
 
//Returns Message ID, If Sent Successfully or the appropriate Error Message 
console.log(response);
});