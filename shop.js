var mongoose= require('mongoose');
var schema = require("mongoose").Schema;
var unvshopschema  = new schema ({
mobile:{
	type:Number,
	required:true
},
otp:{
	type:Number
},
time :{
	type:Number
}
});
var unvshop = mongoose.model('unvshop',unvshopschema);
var shopschema = new schema ({
 mobile:{
 	type:Number,
 	required:true
 },
 shopName:{
 	type:String 
 },
 shopType:{
 	type:Number
 },
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
 verified:{
 	type:Boolean ,
 	default:false
 }   
});
var shop= mongoose.model('shop',shopschema);
module.exports={unvshop,shop};
