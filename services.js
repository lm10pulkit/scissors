var mongoose = require('mongoose');
var schema = mongoose.Schema;
var serviceschema = new schema ({
domain:{
 type:Number,
 required:true
},	
service:{
	type:String ,
	required:true
},
price:{
	type:String,
    required:true
},
shopId:{
	type:String,
	required:true
}
});
var service = mongoose.model('service',serviceschema);
module.exports= {
service
};