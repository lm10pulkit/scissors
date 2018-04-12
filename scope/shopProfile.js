var {findShopById}= require('./../db.js');
var func = function(query,content,callback){
if(query=='getOwnerDetails')
{
   var id = content.shopId;
    console.log(content);
   findShopById(id,function(err,data){
     if(data)
     {
        return callback({ status:"success" , owner:data.ownerName });
     }
     else
     {
       return callback({status:"failed" , mssg:"invalid shopid"});
     }
   });
}
else if(query=='getShopDetails'){
   findShopById(id,function(err,data){
   	   console.log(content);
      if(data){
      	 console.log(data);
      	if(data.shopSex==1)
   	   	data.shopSex='male';
   	   else if(data.shopSex==2)
   	   	data.shopSex='female';
   	   else
   	   	data.shopSex='unisex';
   	   if(data.shopType==0)
   	   	data.shopType='saloon';
   	   else if(data.shopType==1)
   	   	data.shopType='spa';
   	   else
   	   	data.shopType='both';
      	return callback({status:"success",shopName :data.shopName,shopAddress:data.shopAddress,shopType:data.shopType,
         shopSex:data.shopSex});
      }	
      else
      	return callback({status:'failed',mssg:"invalid shopid"});
   });
}
};
module.exports = func;