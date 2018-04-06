var {add,edits,sdelete,myservices}= require('./../db.js');
var func = function(query,content,callback){
    if(query=='add')
    {
       var type=content.domain;
       var data ={
         service:content.service,
         price:content.price,
         shopId:content.shopId
       };
       console.log(type);
       console.log(data);
       add(type,data,function(data1){
          callback(data1);
       });
    }
    else if(query=="edit"){
        var type=content.domain;
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
    else if(query=='init')
    {
        
    }
};
module.exports=func;