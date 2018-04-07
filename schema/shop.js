var mongoose= require('mongoose');
var schema = require("mongoose").Schema;
var unvshopschema  = new schema ({
mobile:{
	type:Number,
	required:true,
	unique:true
},
otp:{
	type:Number,
	required:true
},
time :{
	type:Number,
	required:true
}
});
var unvshop = mongoose.model('unvshop',unvshopschema);
var shopschema = new schema ({
 mobile:{
 	type:Number,
 	required:true,
 	unique:true
 },
 shopName:{
 	type:String 
 },
 shopType:{
 	type:Number
 },
 shopSex:{
 	type:Number
 }
 ,
 shopAddress:{
 	type:String 
 },
 lat:{
 	type:Number
 },
 long:{
 	type:Number
 },
 services:[
    String
 ],
 packages:[
   String
 ],
 homeservices:[
 String
 ],
 verified:{
 	type:Boolean ,
 	default:false
 }   
});
var shop= mongoose.model('shop',shopschema);
module.exports={unvshop,shop};
