var {registershop,addOwnerName}= require("./../db.js");
var dict ={
  "saloon":0,
  "spa":1,
  "both":2
};
var func= function(query,content,callback){
   if(query=='registershop'){
      console.log(content);   	
   	if(content.shopType.toLowerCase()=='saloon')
   		content.shopType=0;
   	else if(content.shopType.toLowerCase()=='spa')
   		content.shopType=1;
    else
    	content.shopType=2;
    if(content.shopSex.toLowerCase()=='male')
      content.shopSex=1;
    else if(content.shopSex.toLowerCase()=='female')
      content.shopSex=2;
    else
      content.shopSex=3;
    var id= content.shopId;
    var data ={
       ac: content.ac,
       shopSex:content.shopSex,
       shopName:content.shopName,
       shopType:content.shopType,
       shopAddress:content.shopAddress,
       lat:content.lat,
       long:content.log
    };
    registershop(id,data,callback);
   }
   else if(query=='setOwnerName'){
         var ownerName= content.owner;
         var shopId=content.shopId;
          addOwnerName(shopId,ownerName,function(err,data){
             if(err)
               return callback({status:"failed",mssg:"server error"});
             if(data.n==1)
               return callback({status:"success"});
            else
               return callback({status:"failed",mssg:"updation error"});
          });
      }
};
module.exports=func;