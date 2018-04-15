var {findShopById,addImageToShop,removeImageFromShop}= require('./../db.js');
var {encodeimage,deleteimage,uploadimage}= require('./../decodestring.js');
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
       callback({status:"success",shopName :data.shopName,shopAddress:data.shopAddress,shopType:shopType,
         shopSex:shopSex});
      }	
      else
      	return callback({status:'failed',mssg:"invalid shopid"});
   });
}
else if(query=='addImage')
{
var imgstr= content.images;
var shopid = content.shopId;
var name = 'cal'+ new Date().getTime()+'.jpeg';
encodeimage(imgstr,name,function(status){
   if(status.status){
      uploadimage(name,function(data){
        addImageToShop(shopid,data.secure_url,function(data){
          if(err)
            console.log(err);
          if(data.n==1)
            return callback({status:"success",imageUrl:data.secure_url});
          else
            return callback({status:"failed",mssg:"error"});
        });
        deleteimage(name);
      });
   }
   else
   {
     return callback({status:'failed'});
   }
});
}
};
module.exports = func;