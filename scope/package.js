var {padd,pdelete,addServiceToPackage,removeServiceFromPackage,mypackage,editPriceOfPackage}= require('./../db.js');
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
        editPriceOfPackage(packageid,price,function(err,data){
          if(err)
            return callback({status:"failed"});
          else if(data.n==1)
          {
            if(additions)
            {
              addServiceToPackage(packageid,additions,function(err,data){
                console.log(err);
                console.log(data);
               if(err)
               return callback({status:"failed"});
               else if(data)
               {
                   if(removals)
                   {
                     removeServiceFromPackage(packageid,removals,function(err,data){
                        console.log(err);
                        console.log(data);                     
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
    else{
      return callback({mssg:"wrong query"});
    }  
};
module.exports = func;