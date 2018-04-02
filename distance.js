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
var l = new linkedlist ();
  var obj=[{lon:12},{lon:11},{lon:19},{lon:24},{lon:50},{lon:100}];
l.add(2,1);
l.add(5,2);
l.add(3,0);
l.add(100,4);
l.add(-1,5);
l.add(1,3);
var mas=l.trav(obj);
console.log(mas);
var calculate = function(obj,lat1,long1)
{
    
};
module.exports = getdistance;

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
var obj=