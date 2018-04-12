var {findShopById}= require('./../db.js');
var func = function(query,content,callback){
if(query=='getOwnerDetails')
{
   var id = content.shopId;
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
	var id = content.shopId;
   findShopById(id,function(err,data){
      if(data){
      	 var shopSex=data.shopSex;
      	 var shopType=data.shopType;
      	if(data.shopSex==1)
   	   	shopSex='male';
   	   else if(data.shopSex==2)
   	   	shopSex='female';
   	   else
   	   	shopSex='unisex';
   	   if(data.shopType==0)
   	   	shopType='saloon';
   	   else if(data.shopType==1)
   	   	shopType='spa';
   	   else
   	   	shopType='both';
       callback({status:"success",shopName :shopName,shopAddress:shopAddress,shopType:shopType,
         shopSex:shopSex});
      }	
      else
      	return callback({status:'failed',mssg:"invalid shopid"});
   });
}
};
module.exports = func;