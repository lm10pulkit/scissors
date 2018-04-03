var mongoose = require('mongoose');
var schema = mongoose.Schema;
var homeserviceschema = new schema ({
services:[{
	domain:Number ,
	service:String
}],
price:{
type:Number,
required:true
},
shopId:{
	type:String,
	required:true
}
});
var homeservice = mongoose.model('homeservice',homeserviceschema);
module.exports=homeservice;