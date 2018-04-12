var mongoose= require('mongoose');
mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost/scissors");
var {unvshop,shop}= require('./schema/shop.js');
var {service}= require('./schema/services.js');
var package = require('./schema/package.js');
var homeservice = require('./schema/homeservice.js');
var sendsms = require('./otp.js');

var dict={
  "hair":0,
  "face":1,
  "body":2,
  "nail":3
};
var dict1={
  0:"hair",
  1:"face",
  2:"body",
  3:"nail"
};
var shoptypeconvert ={
 "male":1,
 "female":2,
 "unisex":3
};
var shoptyperevert= {
1:"male",
2:"female",
3:"unisex"
};
var create= function(mobile,callback){
shop.findOne({mobile:mobile},function(err,data){
  if(data)
  {
    if(data.password)
   return callback({status:"failed",mssg:"no already registered"});
    else
    { 
       shop.remove({mobile:mobile},function(err,data){
            var otp = Math.floor(100000 + Math.random() * 900000);
    var time = new Date().getTime();
    var data1 = {mobile:mobile,otp,time};
    var mssg = 'your otp for shop verification is '+ otp;
    unvshop.findOne({mobile:mobile},function(err,data){
       if(!data){
        sendsms(mobile,mssg,function(status){
    if(status.status)
    {    
    var new_data = new unvshop(data1);
    new_data.save(function(err,data){
        if(err)
          return callback({status:'failed',mssg:"server error"});
        else
        {
          // send otp
           console.log(data);
          return callback({status:'send'});
        }
    });
    }
    else
    {
     return callback({status:"failed",mssg:"invalid mobile no"});  
    }
  });
      }
     else
     {
      unvshop.update({mobile:mobile},{otp:otp,time:time},function(err,data){
         if(data.n==1)
         {
          sendsms(mobile,mssg,function(status){
              return callback({status:"send"},);
          });
         }
         else
          return callback({status:"failed",mssg:"no error"});
      });
     } 
    });
       });
    }   
  } 
  else
  {
    var otp = Math.floor(100000 + Math.random() * 900000);
    var time = new Date().getTime();
    var data1 = {mobile:mobile,otp,time};
    var mssg = 'your otp for shop verification is '+ otp;
    unvshop.findOne({mobile:mobile},function(err,data){
       if(!data){
        sendsms(mobile,mssg,function(status){
    if(status.status)
    {    
    var new_data = new unvshop(data1);
    new_data.save(function(err,data){
        if(err)
          return callback({status:'failed',mssg:"server error"});
        else
        {
          // send otp
           console.log(data);
          return callback({status:'send'});
        }
    });
    }
    else
    {
     return callback({status:"failed",mssg:"invalid mobile no"});  
    }
  });
      }
     else
     {
      unvshop.update({mobile:mobile},{otp:otp,time:time},function(err,data){
         if(data.n==1)
         {
          sendsms(mobile,mssg,function(status){
              return callback({status:"send"},);
          });
         }
         else
          return callback({status:"failed",mssg:"no error"});
      });
     } 
    });
  }
});
};
/*
sendsms(mobile,mssg,function(status){
    if(status.status)
    {    
    var new_data = new unvshop(data1);
    new_data.save(function(err,data){
        if(err)
          return callback({status:'failed',mssg:"server error"});
        else
        {
          // send otp
           console.log(data);
          return callback({status:'send'});
        }
    });
    }
    else
    {
     return callback({status:"failed",mssg:"invalid mobile no"});  
    }
  });
*/
var checkotp= function(mobile,otp,callback){
  findShopByNo(mobile,function(err,data){
    if(data){
     return callback({status:"success",mssg :"already in verified"});
    }
    else
    {
     
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
                        return callback({status:"success",mssg:"successful verification",shopId:data._id});
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
  }
});
};
var savePassword = function(shopid,password,callback){
    shop.update({_id:shopid},{password:password},callback);
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
           	var mssg = 'your otp for shop verification is '+otp;
            sendsms(mobile,mssg,function(status){
              if(status.status)
             return callback({status:"success",mssg:"otp resend successful"});
              else
              return callback({status:"failure",mssg:"invalid mobile no"});  
            });
          
           }
           else{
           	return callback({status:"error",mssg:"no does not exsist"});
           }
       }
     });
};
var registershop = function(id,data,callback){
   shop.update({_id:id},data,function(err,data){
    console.log('in the checking function');
    console.log(err);
    console.log(data);
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
var addOwnerName = function(shopid,ownerName,callback){
shop.update({_id:shopid},{ownerName:ownerName},callback);
};
var add = function(type,data,callback){
   console.log(type);
   data.domain= dict[type];
    console.log(data);
   var new_service = new service(data);
   new_service.save(function(err,data){
        if(err)
        { 
          console.log(' in the err');
          console.log(err);
          return callback({status:"failed",mssg:"server error"});
        }
        if(data){
          console.log(data);
          addServiceToShop(data.shopId,data._id,function(err,data){
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
var edits= function(id,price,callback){

     service.update({_id:id},{price:price},function(err,data){
          if(err)
            return callback({status:"failed"});
          else
            return callback({status:"success"});
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
var findServicesInShop = function(ids,callback){
service.find({_id:{$in :ids}},callback);
};
var addServiceToShop = function(shopid,serviceid,callback){
  shop.update({_id:shopid},{$push:{services:serviceid}},callback);
};
var addPackageToShop= function(shopid,packageid,callback){
shop.update({_id:shopid},{$push:{packages:packageid}},callback);
};
var getService = function(serviceid,callback){
service.findOne({_id:serviceid},callback);
};
var getPackage = function(packageid,callback){
package.find({_id:packageid},callback);
};
var findShopById= function(id,callback){
 shop.findOne({_id:id},callback);
};
var findShopByNo= function(no,callback){
 shop.findOne({mobile:no},callback);
};

var findPackagesInShop = function(ids,callback){
package.find({_id:{$in :ids}},callback);
};
var myservices = function(id,callback){
   console.log(id);
    findShopById(id,function(err,data){
      console.log(data);
      console.log(err);
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
  for(var x =0;x<ser.length;x++)
    ser[x].domain= dict[ser[x].domain];
  package.update({_id:packageid},{$pushAll:{services:ser}},callback);
};
var editPriceOfPackage = function(packageid,price,callback){
     package.update({_id:packageid},{price:price},callback);
};
// can be improved from o(n2) to o(n1)
var filteringService=function(data,ser){
var data1=[];
for(var x =0;x<data.length;x++){
   for(var y =0;y<ser.length;y++){
    if(data[x]._id.toString()==ser[y].toString()){
      console.log("equal");
      data1.push(data[x]);
    }
   }
}
return data1;
};
var removeServiceFromPackage = function(packageid,serid,callback){

  package.findOne({_id:packageid},function(err,data){
         console.log(data);
        var data1 =filteringService(data.services,serid);
        console.log(serid);
        console.log(data);
        console.log(data1);
        package.update({_id:packageid},{$pullAll:{services:data1}},callback);
  });
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
// homeserviceadd addHomeServiceToShop,homeServiceAdd,addServiceToHomeService,removeServiceFromHomeService
var editPriceOfHomeService = function(homeserviceid,price,callback){
     homeservice.update({_id:homeserviceid},{price:price},callback);
};
var addHomeServiceToShop = function(shopid,homeserviceid,callback){
shop.update({_id:shopid},{$push:{homeservices:homeserviceid}},callback);
};
var removeHomeServiceFromShop= function(shopid,homeserviceid,callback){
  shop.update({_id:shopid},{$pull :{homeservices:homeserviceid}},callback);
};
var homeServiceAdd = function(data,callback){
    for(var x =0;x<data.services.length;x++){
      console.log(data);
      data.services[x].domain=dict[data.services[x].domain];
    } 
    console.log(data);
    var new_data= new homeservice(data);
    new_data.save(function(err,data1){
    if(err)
    return callback({status:"failed",mssg:"server error"});
    if(data1){
      addHomeServiceToShop(data1.shopId,data1._id,function(err,data){
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
var addServiceToHomeService= function(homeserviceid,ser,callback){
  for(var x =0;x<ser.length;x++)
    ser[x].domain= dict[ser[x].domain];
    console.log(homeserviceid);
  homeservice.update({_id:homeserviceid},{$pushAll:{services:ser}},callback);
};
var removeServiceFromHomeService = function(homeserviceid,serid,callback){
    homeservice.findOne({_id:homeserviceid},function(err,data){
        var data1 =filteringService(data.services,serid);     
        homeservice.update({_id:homeserviceid},{$pullAll:{services:data1}},callback);
  });
};
var removeHomeService=function(id,callback){
    homeservice.remove({_id:id},callback);
};
var HomeServiceDelete= function(shopid,homeserviceid,callback){
     removeHomeService(homeserviceid,function(err,data){
           
            if(err)
              return callback({status:"failed"});
            else
            {
              if(data.n==1)
              {
                
                removeHomeServiceFromShop(shopid,homeserviceid.toString(),function(err,data){
                    
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

var myhomeservices = function(shopid,callback){
  findShopById(shopid,function(err,data){
     
  });
};
shop.find().then(function(data){
  for(var x =0;x<data.length;x++)
     console.log(data[x]);
});
unvshop.remove().then(function(data){
  console.log(data);
});
//shop.remove().then(function(data){
//  console.log(data);
//});
/*
var clear= function(){


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
shop.remove().then(function(data){
  console.log(data);
});
service.remove().then(function(data){
  console.log(data);
});
package.remove().then(function(data){
  console.log(data);
});
unvshop.remove().then(function(data){
  console.log(data);
});

unvshop.remove().then(function(data){
  console.log(data);
 });
*/  
module.exports={create,checkotp,resendotp,registershop,add,padd,edits,pdelete,sdelete,addServiceToPackage,editPriceOfPackage,
removeServiceFromPackage,HomeServiceDelete,findShopById,
mypackages,myservices,addHomeServiceToShop,homeServiceAdd,addServiceToHomeService,removeServiceFromHomeService,
editPriceOfHomeService,getService,getPackage,savePassword,findShopByNo,addOwnerName};