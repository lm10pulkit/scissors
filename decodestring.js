var fs = require('fs');
var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'dhujdb1zv', 
  api_key: '443542749568666', 
  api_secret: 'EkdDKqhZbal71U9z-BwaN97hAso' 
});
let deleteimage = function(name){
var path =__dirname+'/'+name;
fs.unlink(path, function (err) {
  if (err) 
  	console.log(err);
  else
  	console.log('file deleted');
});
};

let uploadimage = function(name,callback){
	var path =__dirname+'/'+name;
cloudinary.uploader.upload(path, callback);
};

 
let encodeimage = function(val,name,callback){
let base64String = 'data:image/jpeg;base64,'+val; // Not a real image
// Remove header
let base64Image = base64String.split(';base64,').pop();
fs.writeFile(name, base64Image, {encoding: 'base64'}, function(err) {
    if(err)
    	return callback({status:false});
    else
    	return callback({status:true});
});
};
module.exports = {encodeimage,deleteimage,uploadimage};