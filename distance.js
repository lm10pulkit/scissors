function getdistance(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
var sort = function(data,lat1,long1){
var l = new linkedlist();
for(var x =0;x<data.length;x++){
  var d = getdistance(data[x].lat,data[x].long,lat1,long1);
  l.add(d,x);
}
var data1 = l.trav(data);
return data1;
};

var linkedlist= function(){
  var length=0;
  var head=null;
  var node = function(dist,index){
     this.dist = dist;
     this.index=index;
     this.next=null;
  };
  this.add= function(dist,index){
     var new_node = new node(dist,index);
     if(head==null)
     {
       head=new_node;
       return ;
     }
     var prev=null;
     var trav =head;
     while(trav!=null)
     {
        if(trav.dist>dist)
        {
          break;
        }
        prev= trav;
        trav=trav.next;
     }
     if(prev==null){
      new_node.next=head;
       head=new_node;
     }
     else
     {
      new_node.next=prev.next;
      prev.next=new_node;
     }
  };
  this.trav= function(obj){
     var trav=head;
     var obj1=[];
     while(trav!=null){
       obj1.push(obj[trav.index]);
       trav=trav.next;
     }
     return obj1;
  }
};
 var data = [{lat:12,long:13},{lat:12.1112,long:13},{lat:0,long:1},{lat:120,long:13},{lat:120,long:130}];
 var val=sort(data,12,13);
 console.log(val);
module.exports = sort;

/*  d = getdistance(12,13,12.001,13.001);
console.log(d);
var dist = function(data){
  var dat =[];
  for(var x =0;x<data.length;x++){
      if(data[x].length>1){
        dat.push(data[x]);
      }
  }
  return dat;
};
var da = dist(["aa","aaaa","a","a","a","aa","aaaa","a","a","a","aa","aaaa","a","a","a","aa","aaaa","a","a","a","aa","aaaa","a","a","a","aa","aaaa","a","a","a"]);
var fa =dist(da);
console.log(fa);
*/