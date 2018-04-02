var {padd,pdelete,addservice,removeServiceFromPackage,mypackages}= require('./../db.js');
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
    else if(query=='addservice'){
    	var packageid = content.packageId;
    	var data={
          domain:content.domain,
          service:content.service
    	};
    	addservice(packageid,data,function(data){
           return callback(data);
    	});
    }
    else if(query=='removeservice'){
    	var packageid=content.packageId;
    	var serviceid=content.serviceId;
    	removeServiceFromPackage(packageid,serviceid,function(err,data){
    		console.log(err);
    		console.log(data);
         if(err)
         	return callback({status:"failed"});
         else
         {
         	if(data.n==1)
         	return callback({status:"success"});
            else
            return callback({status:"failed"});
         }
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
};
module.exports = func;