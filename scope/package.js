var {padd,pdelete,addServiceToPackage,removeServiceFromPackage,mypackages,editPriceOfPackage,getPackage}= require('./../db.js');
var func= function(query,content,callback){
	if(query=='add'){
        padd(content,function(data){
             return callback(data);
        });
      }
    else if(query=='delete'){
    	var shopid = content.shopId;
    	var packageid = content.packageId;
        pdelete(shopid,packageid,function(data){
            return callback(data);
        });
    }
    else if(query=='edit')
    {
      	var price = content.price;
        var removals = content.removals;
        var additions = content.additions;
        var packageid = content.packageId;
        var removal =[];
        for(var x =0;x<removals.length;x++)
          removal.push(remvals[x]._id);
        editPriceOfPackage(packageid,price,function(err,data){
          if(err)
            return callback({status:"failed"});
          else if(data.n==1)
          {
            if(additions)
            {
              addServiceToPackage(packageid,additions,function(err,data){
               if(err)
               return callback({status:"failed", mssg:"error1"});
               else if(data.n==1)
               {
                   if(removal)
                   {
                     removeServiceFromPackage(packageid,removal,function(err,data){
                        console.log(err);
                        console.log(data);                     
                       if(err)
                        return callback({status:"failed", mssg:"error2"});
                      else if(data)
                        return callback({status:"success", mssg:"success3"});
                      else
                        return callback({status:"failed", mssg:"error3"});
                     });
                   }
                   else
                    return callback({status:"success", mssg:"success2"});
               }
               else
                return callback({status:"failed", mssg:"error4"});

              });
            }
            else
              return callback({status:"success", mssg:"success1"});
          }
          else
            return callback({status:"failed", mssg:"error5"});

        });
    }
    else if(query=='mypackages')
    {
        var shopid = content.shopId;
        mypackages(shopid,function(err,data){
           if(err)
           	return callback({status:"failed",packages:null});
           else{
           	if(data)
           		return callback({status:"success",packages:data});
           	else
           		return callback({status:"failed",packages:null});
           }
        });
    }
    else if(query=='single'){
      var packageid= content.packageId;
       getPackage(packageid,function(err,data){
           if(err)
          return callback({status:"failed",mssg:"server error"});
         if(data)
          return callback({status:"success",package:data});
         else
          return callback({status:"failed",mssg:"invalid id"});
       });
    } 
    else{
      return callback({mssg:"wrong query"});
    }  
};
module.exports = func;