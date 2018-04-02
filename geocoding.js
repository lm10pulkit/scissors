//AIzaSyD-8PbCpW_fcTmElJkRKMqjj1SQPAQMq2Q
var request = require('request');
// reqverse geocoding 
var url= "https://maps.googleapis.com/maps/api/geocode/json?latlng=28.597621,77.0477042&key=AIzaSyD-8PbCpW_fcTmElJkRKMqjj1SQPAQMq2Q";
request(url,function(err,resp,body){
console.log(body);
});

//var url1="https://maps.googleapis.com/maps/api/geocode/json?address=b 57 aashirwaad apartments sector 12 dwarka new delhi-110075 india &key=AIzaSyD-8PbCpW_fcTmElJkRKMqjj1SQPAQMq2Q";
//request(url1,function(err,resp,body){
 //console.log(body);
//});