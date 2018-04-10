 var {create,checkotp,resendotp,savePassword,findShopByNo,addOwnerName,findShopById}= require('./../db.js');
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
           savePassword(shopid,password,function(err,data){
               if(err)
                  return callback({status:"failed",mssg:"server error"});
               if(data.n==1)
                  return callback({status:"success",mssg:"added password",shopId:shopid});
               else
                  return callback({status:"failed",mssg:"uncertainity"});           
           });
        
      }
      else if(query=='check'){
         var shopid= content.shopId;
         console.log(query);
         console.log(content);
         findShopById(shopid,function(err,data){
             console.log(data);
             console.log(err);
              if(err)
               return callback({status:"failed",mssg:"invalid id"});
            if(data)
            {
              var undone= 'nothing';
              if(!data.lat)
              undone= 'shopRegistration';
              else if(!data.ownerName)
              undone ='owner';
              console.log(undone);
              return callback({status:"success",undone:undone,mssg:"successful"});
            }
            else
               return callback({status:"failed",mssg:"uncertainity"});
         }); 
      }
      else if(query=='login')
      {
         var password= content.password;
         var mobile= content.mobile;
         findShopByNo(mobile,function(err,data){
            if(err)
               return callback({status:"error",error:"server error",shopId:null});
            if(!data)
            {
              return callback({status:"failed",shopId:null});
            }
            else
            {
               if(data.password==password)
               {
                  var undone= 'nothing';
                  if(!data.lat)
                     undone='shopRegistered';
                  else if(data.ownerName);
                     undone='owner';
                  return callback({status:"success",undone:undone,shopId:data._id});
               }
               else
                  return callback({status:"failed",mssg:"password did not match",shopId:null});
            } 
         });
      }      
};

module.exports=func;
