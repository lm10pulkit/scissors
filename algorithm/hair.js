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
var func = function(data,lat,long,i,callback){
 var data1= sort(data,lat,long);
 if(i>data1.length)
 	return callback({hair:[],body:[],nail:[],face:[]});
 var end = i+5;
 if(end>data.length) 
 	end=data.length;
 var data2= data1.slice(i,end);
   func1(data2,function(data3){
   	var data4 ={};
     data4.hair =data3[0];
   	  data4.face=data3[1];
   	 data4.body=data3[2]; 
      data4.nail=data3[3];
      return callback(data4);
   });
}; 
var func1= function(data,callback){
  var data1=[];
  data1[0]=[];
  data1[1]=[];
  data1[2]=[];
  data1[3]=[];
  var count=0;
  for(var x =0;x<data.length;x++){
     myservices(data[x]._id,function(err,services){
     	count++;
       for(var y =0;y<services.length;y++)
       {
        data1[services[y].domain].push(services[y]);
       }
       if(count==data.length)
       return callback(data1);         
     });
  }  
};