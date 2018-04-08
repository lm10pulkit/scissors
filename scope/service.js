var {add,edits,sdelete,myservices,getService}= require('./../db.js');
var func = function(query,content,callback){
    if(query=='add')
    {
       var type=content.domain;
       var data ={
         service:content.service,
         price:content.price,
         shopId:content.shopId
       };
       add(type,data,function(data1){
          callback(data1);
       });
    }
    else if(query=="edit"){
      
        var id = content.serviceId;
        var price = content.newPrice;
        console.log(content);
         edits(id.toString(),price,function(data){
           return callback(data);
         });
    }
    else if(query=='delete'){
       var shopid= content.shopId;
       var serviceid = content.serviceId;
       sdelete(shopid,serviceid,function(data){
            return callback(data);
       });
    }
    else if(query=='myservices')
    {
        var shopid = content.shopId;
        console.log(shopid);
        
        myservices(shopid,function(err,data){
           if(err)
            return callback({status:"failed",services:null});
           else{
            if(data)
              return callback({status:"success",services:data});
            else
              return callback({status:"failed",services:null});
           }
        });
    }
    else if(query=='single'){
      var serviceid = content.serviceId;
      getService(serviceid,function(err,data){
         if(err)
          return callback({status:"failed",mssg:"server error"});
         if(data)
          return callback({status:"success",service:data});
         else
          return callback({status:"failed",mssg:"invalid id"});
      });
    }
    else if(query=='init')
    {
        
    }
};
module.exports=func;