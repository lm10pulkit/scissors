var {create,checkotp,resendotp}= require('./../db.js');
var func = function(query,content,callback){
      if(query=="sendOTP")
      {
        create(content.mobile,callback);
      }
      else if(query=="verifyOTP"){
      	checkotp(content.mobile,content.otp,callback);
      }
      else if(query=="resend"){
         resendotp(content.mobile,callback);
      }
};
module.exports=func;
