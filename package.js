var mongoose = require('mongoose');
var schema = mongoose.Schema;
var packageschema = new schema ({
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
var package = mongoose.model('package',packageschema);
module.exports=package;