var express= require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var verification= require('./scope/verification.js');
var shopRegistration= require('./scope/shopRegistration');
var service = require('./scope/service.js');
var package = require("./scope/package.js");
var homeservice = require('./scope/homeservice.js');
var shopProfile = require('./scope/shopProfile.js');
const port = process.env.PORT||8080;
var app = express();
var cookieparser= require('cookie-parser');
var session = require('express-session');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var MongoStore = require('connect-mongo')(session);
// middleware for cookie parser
app.use(cookieparser());

//middleware for session
app.use(session(
  {
    secret:'secret',
      saveUninitialized:true,
    resave:true,
    store : new MongoStore({mongooseConnection:mongoose.connection})
  }));

app.post('/dataBaseModify',function(req,res){
	var scope= req.body.scope;
	var query= req.body.query;
	var content= req.body.content;
  var requester = req.body.requester;
  var requestno = req.body.requestNo;
  if(scope=='verification')
  {

  	verification(query,content,function(data){
  		data.query=query;
  		data.scope=scope;
      data.requester = requester;
      data.requestno = requestno;
       res.send(data);
  	});
  }
  else if(scope=='shopRegistration')
  {
  	
   shopRegistration(query,content,function(data){
   	data.query=query;
  		data.scope=scope;
      data.requester = requester;
      data.requestno = requestno;
      res.send(data);
   });   
  }
  else if(scope=='service')
  {
  	   console.log(req.body);
  	service(query,content,function(data){
  		data.query=query;
  		data.scope=scope;
      data.requester = requester;
      data.requestno = requestno;
      res.send(data);
  	});
  }
  else if(scope=='package')
  {
       package(query,content,function(data){
       	data.query=query;
  	  	data.scope=scope;
        data.requester = requester;
        data.requestno = requestno;
        res.send(data);
     });
  }
  else if(scope=='homeservice'){
  	  homeservice(query,content,function(data){
        data.query=query;
  		data.scope=scope;
      data.requester = requester;
      data.requestno = requestno;
        res.send(data);   
  	  });
  }
  else if(scope=='shopProfile'){
       shopProfile(query,content,function(data){
        data.query=query;
      data.scope=scope;
      data.requester = requester;
      data.requestno = requestno;
        res.send(data);   
      });
  }
  else{
  	res.send({mssg:"wrong scope work harder"});
  }
});
app.listen(port,function(err){
  if(err)
  	throw err;
  console.log('connected to the port 8080');
});