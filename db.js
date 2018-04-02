var mongoose= require('mongoose');
mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost/scissors");
var {unvshop,shop}= require('./shop.js');
var {service}= require('./services.js');
var package = require('./package.js');
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

var create= function(mobile,callback){
shop.findOne({mobile:mobile},function(err,data){
  if(data)
  {
    return callback({status:"failed",mssg:"no already in use"});
  }
  else
  {
    var otp = Math.floor(100000 + Math.random() * 900000);
    var time = new Date().getTime();
    var data1 = {mobile:mobile,otp,time};
    var new_data = new unvshop(data1);
    new_data.save(function(err,data){
        if(err)
        	return callback({status:'failed',mssg:"server error"});
        else{
        	// send otp

        	return callback({status:'send'});
        }
    });
  }
});
};
var checkotp= function(mobile,otp,callback){
  unvshop.findOne({mobile:mobile},function(err,data){
        if(err||(!data))
        	return callback({status:"failed",mssg:"server error"});
        else{
        	var new_t= new Date().getTime();
        	if(new_t-data.time<=300000)
        	{
                if(otp==data.otp){
                	createshop(mobile,function(err,data){
                        console.log(data);
                        return callback({status:"success",mssg:"successful verification",shopid:data._id});
                	});
                	unvshop.remove({mobile:mobile},function(err,data){
                      console.log(data);
                	});
                	
                }
                else
                	return callback({status:"failed",mssg:"otp did not match"});
        	}
        	else
        	{
              return callback({status:"failed",mssg:"timeout"});
        	}

        }
  });
};
var createshop= function(mobile,callback){
    var new_data = new shop({mobile});
    new_data.save(callback);
};
var resendotp = function(mobile,callback){
    var otp = Math.floor(100000 + Math.random() * 900000);
    var time = new Date().getTime();
     unvshop.update({mobile},{otp,time},function(err,data){
           if(err)
           return callback({status:"error",mssg:"database error"});
           else{
           	//sendotp
           	if(data.n==1){
           	console.log(data);
           return callback({status:"success",mssg:"otp resend successful"});
           }
           else{
           	return callback({status:"error",mssg:"no does not exsist"});
           }
       }
     });
};
var registershop = function(id,data,callback){
   shop.update({_id:id},data,function(err,data){
          if(err){
          	return callback({status:"failed",mssg:"server error"});
          }
          else{
            if(data.n==1)
          	return callback({status:"success",mssg:"shop details have been added"});
            else
            return callback({status:"failed",mssg:"shop id does not exsist"});  
          }
   });
};
var add = function(type,data,callback){
   data.domain= dict[type];
   var data1=data;
   var new_service = new service(data);
   new_service.save(function(err,data){
        if(err)
        {
          return callback({status:"failed",mssg:"server error"});
        }
        if(data){
          console.log(data);
          addServiceToShop(data1.shopId,data._id,function(err,data){
                     if(!err)
                    return callback({status:"success",mssg:"service added"});
                     else
                     return callback({status:"failed",mssg:"server error"}); 
          });
           
         }
        else
          return callback({status:"failed",mssg:"server error"});
   });
};
var padd = function(data,callback){
    for(var x =0;x<data.services.length;x++){
      console.log(data);
      data.services[x].domain=dict[data.services[x].domain];
    } 
    console.log(data);
    var new_data= new package(data);
    new_data.save(function(err,data1){
    if(err)
    return callback({status:"failed",mssg:"server error"});
    if(data1){
      addPackageToShop(data1.shopId,data1._id,function(err,data){
          if(!err)
            return callback({status:"success"});
          else
            return callback({status:"failed"});        
      });
    }
    else
     return callback({status:"failed"});
});
};
var edits= function(id,price,callback){

     service.update({_id:id},{price:price},function(err,data){
          if(err)
            return callback({status:"failed"});
          else
            return callback({status:"success"});
     });
};
var addServiceToShop = function(shopid,serviceid,callback){
  shop.update({_id:shopid},{$push:{services:serviceid}},callback);
};
var addPackageToShop= function(shopid,packageid,callback){
shop.update({_id:shopid},{$push:{packages:packageid}},callback);
};
var findShopById= function(id,callback){
 shop.findOne({_id:id},callback);
};
var findShopByNo= function(no,callback){
 shop.findOne({mobile:no},callback);
};
var findServicesInShop = function(ids,callback){
service.find({_id:{$in :ids}},callback);
};
var findPackagesInShop = function(ids,callback){
package.find({_id:{$in :ids}},callback);
};
var myservices = function(id,callback){
    findShopById(id,function(err,data){
        findServicesInShop(data.services,callback);
    });
};
var mypackages = function(id,callback){
    findShopById(id,function(err,data){
        findPackagesInShop(data.packages,callback);
    });
};
var removePackage=function(id,callback){
    package.remove({_id:id},callback);
};

var removeServiceFromShop = function(shopid,serviceid,callback){
  shop.update({_id:shopid},{$pull :{services:serviceid}},callback);
} ;
var removePackageFromShop= function(shopid,packageid,callback){
  shop.update({_id:shopid},{$pull :{packages:packageid}},callback);
};
var addServiceToPackage= function(packageid,ser,callback){
  ser.domain= dict[ser.domain];
  package.update({_id:packageid},{$push:{services:ser}},callback);
};
var addservice = function(packageid,data,callback){
     console.log(data);
     console.log(packageid);
   addServiceToPackage(packageid,data,function(err,data){
        if(err)
          return callback({status:"failed"});
        else{
          if(data.n==1)
            return callback({status:"success"});
          else
            return callback({status:"failed"});
        }
   });
};
var removeServiceFromPackage = function(packageid,serid,callback){
  package.update({_id:packageid},{$pull :{services:{_id:serid}}},callback);
};
var pdelete= function(shopid,packageid,callback){
     removePackage(packageid,function(err,data){
           
            if(err)
              return callback({status:"failed"});
            else
            {
              if(data.n==1)
              {
                
                removePackageFromShop(shopid,packageid.toString(),function(err,data){
                    
                   if(err){
                     return callback({status:"failed"});
                   }
                   else{
                    console.log(data);
                       if(data.n==1)
                        return callback({status:"success"});
                        else
                        return callback({status:"failed"});  
                   }
                });
              }
              else
                return callback({status:"failed"});
            }
     });
};
var removeservice= function(serviceid,callback){
   service.remove({_id:serviceid},callback);
};
var sdelete= function(shopid,serviceid,callback){
    removeServiceFromShop(shopid,serviceid,function(err,data){
        console.log(shopid);
        console.log(serviceid);
       if(err)
              return callback({status:"failed"});
            else
            {
              console.log(data);
              if(data.n==1)
              {
                
                removeservice(serviceid,function(err,data){
                   if(err){
                     return callback({status:"failed"});
                   }
                   else
                   {
                    console.log(data);
                       if(data.n==1)
                        return callback({status:"success"});
                        else
                        return callback({status:"failed"});  
                   }
                });
              }
              else
                return callback({status:"failed"});
            }
    });
};
var clear= function(){
unvshop.remove().then(function(data){
	console.log(data);
});
};
unvshop.find().then(function(data){
  console.log(data);
});
shop.find().then(function(data){
  console.log(data);
});
package.findOne().then(function(data){
  console.log(data);
});
service.find().then(function(data){
console.log(data);
});
/*
shop.remove().then(function(data){
  console.log(data);
});
var data = [hair,face,body,spa,other];
data.forEach(function(item){
 item.remove().then(function(data){
  console.log(data);
 });
});
package.remove().then(function(data){
 console.log(data);
});
*/
module.exports={create,checkotp,resendotp,registershop,add,padd,edits,pdelete,sdelete,addservice,
removeServiceFromPackage,mypackages,myservices};