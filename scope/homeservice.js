var {addHomeServiceToShop,editPriceOfHomeService,
homeServiceAdd,addServiceToHomeService,removeServiceFromHomeService,HomeServiceDelete}= require('./../db.js');
var dict={
  "hair":0,
  "face":1,
  "body":2,
  "spa":3,
  "nail":4
};
var dict1={
  0:"hair",
  1:"face",
  2:"body",
  3:"spa",
  4:"nail"
};
var func = function(query,content,callback){
  if(query=='add'){
  	homeServiceAdd(content,function(data){
      return  callback(data);
  	});
  }
  else if(query=='delete'){
  	var homeserviceid = content.homeServiceId;
  	var shopid = content.shopId;
    HomeServiceDelete(shopid,homeserviceid,function(data){
          return callback(data);
    }); 
  }
  else if(query=='edit'){
    var price = content.price;
        var removals = content.removals;
        var additions = content.additions;
        var homeserviceid = content.homeServiceId;
        console.log(homeserviceid);
        editPriceOfHomeService(homeserviceid,price,function(err,data){
          if(err)
            return callback({status:"failed"});
          else if(data.n==1)
          {
            if(additions)
            {
              addServiceToHomeService(homeserviceid,additions,function(err,data){
               if(err)
               return callback({status:"failed"});
               else if(data)
               {
                   if(removals)
                   {
                     removeServiceFromHomeService(homeserviceid,removals,function(err,data){
                                         
                       if(err)
                        return callback({status:"failed"});
                      else if(data)
                        return callback({status:"success"});
                      else
                        return callback({status:"failed"});
                     });
                   }
                   else
                    return callback({status:"success"});
               }
               else
                return callback({status:"failed"});

              });
            }
            else
              return callback({status:"success"});
          }
          else
            return callback({status:"failed"});

        });
  }
  else
  {
    return {mssg:"wrong query"};
  }
};
module.exports = func;
