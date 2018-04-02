var {registershop}= require("./../db.js");
var dict ={
  "saloon":0,
  "spa":1,
  "both":2
};
var func= function(query,content,callback){
	console.log(query);
	console.log(content);
   if(query=='registershop'){
   	console.log(query);
   	if(content.shopType=='saloon')
   		content.shopType=0;
   	else if(content.shopType=='spa')
   		content.shopType=1;
    else
    	content.shopType=2;
    var id= content.id;
    var data ={
       shopName:content.shopName,
       shopType:content.shopType,
       shopAddress:content.shopAddress,
       lat:content.lat,
       long:content.long
    };
    console.log(id);
    console.log(data);
    registershop(id,data,callback);
   }
 
};
module.exports=func;