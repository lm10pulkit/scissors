 var {create,checkotp,resendotp,savePassword}= require('./../db.js');
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
      else if(query=="setPassword"){
        var password = content.password;
        var shopid  = content.shopId;
           savePassword(password,function(err,data){
               if(err)
                  return callback({status:"failed",mssg:"server error"});
               if(data.n==1)
                  return callback({status:"success",mssg:"added password"});
               else
                  return callback({status:"failed",mssg:"uncertainity"});           
           });
        
      }
      else if(query=='login'){
         var gh=0;
      }
};
module.exports=func;
