var express= require('express');
var bodyParser = require('body-parser');
var verification= require('./scope/verification.js');
var shopRegistration= require('./scope/shopRegistration');
var service = require('./scope/service.js');
var package = require("./scope/package.js");
const port = process.env.PORT||8080;
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/dataBaseModify',function(req,res){
	var scope= req.body.scope;
	var query= req.body.query;
	var content= req.body.content;
  if(scope=='verification')
  {
  	verification(query,content,function(data){
       res.send(data);
  	});
  }
  else if(scope=='shopRegistration')
  {
  	console.log(scope);
   shopRegistration(query,content,function(data){
      res.send(data);
   });   
  }
  else if(scope=='service')
  {
  	service(query,content,function(data){
      res.send(data);
  	});
  }
  else if(scope=='package')
  {
     package(query,content,function(data){
       res.send(data);
     });
  }
});
app.listen(port,function(err){
  if(err)
  	throw err;
  console.log('connected to the port 8080');
});