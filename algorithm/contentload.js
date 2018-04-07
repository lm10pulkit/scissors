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
//
var sort = require('./distance.js');
var {myservices} =require('./../db.js'); 
var init = function(data,lat,long,shopNo,callback){
  var data1= sort(data,lat,long);
  var start= shopNo;
  var end =shopNo+5;
  if(end>data.length)
  	end=data.length ;
  if(start==end)
  	return callback({hair:[],face:[],body:[],nail:[]});
  var data2 = data.slice(start,end);
  totalservicesinallshop(data2,function(err,services){
       var datat3=serviceDivision(services);
       data3.shopNo=end;
       return callback(data3);
  });
};
var hair = function(data,lat,long,shopNo,callback){
    var data1= sort(data,lat,long);
  var start= shopNo;
  var end =shopNo+5;
  if(end>data.length)
  	end=data.length ;
  if(start==end)
  	return callback({hair:[]});
  var data2 = data.slice(start,end);
  totalservicesinallshop(data2,function(err,services){
       var data3 = serviceDivision(services);
       var data4.hair=data3.hair;
       data4.shopNo=shopNo;
       return callback(data4);
  });
};
var face = function(data,lat,long,shopNo,callback){
    var data1= sort(data,lat,long);
  var start= shopNo;
  var end =shopNo+5;
  if(end>data.length)
  	end=data.length ;
  if(start==end)
  	return callback({hair:[]});
  var data2 = data.slice(start,end);
  totalservicesinallshop(data2,function(err,services){
       var data3 = serviceDivision(services);
       var data4.face=data3.face;
       data4.shopNo=shopNo;
       return callback(data4);
  });
};
var body = function(data,lat,long,shopNo,callback){
    var data1= sort(data,lat,long);
  var start= shopNo;
  var end =shopNo+5;
  if(end>data.length)
  	end=data.length ;
  if(start==end)
  	return callback({hair:[]});
  var data2 = data.slice(start,end);
  totalservicesinallshop(data2,function(err,services){
       var data3 = serviceDivision(services);
       var data4.body=data3.body;
       data4.shopNo=shopNo;
       return callback(data4);
  });
};
var nail = function(data,lat,long,shopNo,callback){
    var data1= sort(data,lat,long);
  var start= shopNo;
  var end =shopNo+5;
  if(end>data.length)
  	end=data.length ;
  if(start==end)
  	return callback({hair:[]});
  var data2 = data.slice(start,end);
  totalservicesinallshop(data2,function(err,services){
       var data3 = serviceDivision(services);
       var data4.nail=data3.nail;
       data4.shopNo=shopNo;
       return callback(data4);
  });
};
var totalservicesinallshop = function(data,callback){
     var data1=[];
     var count=0;
     for(var x = 0;x<data.length;x++)
     {
       myservices(data[x]._id,function(err,data2){
       	count++;
          data1.concat(data2);
          if(count==data.length)
          return callback(data1);          
       });
     }
};
var serviceDivision = function(data){
   var hair=[];
   var body=[];
   var nail=[];
   var face=[];
   for(var x =0;x<data.length;x++)
   {
     if(data[x].domain==0)
     	hair.push(data[x]);
     else if(data[x].domain==1)
     	face.push(data[x]);
     else if(data[x].domain==2)
     	body.push(data[x]);
     else if(data[x].domain==3)
     	nail.push(data[x]);
   }
   var data={};
   data.hair=hair;
   data.face=face;
   data.nail=nail;
   data.body=body;
   return data;
};
var shopserve= function(data,shopcount){
var start= shopcount;
var end= shopcount+20;
if(end>data.length)
	end=data.length;
if(start==end)
	return [];
else
	return data.slice(start,end);
};