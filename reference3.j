//
{
   scope:"verification",
   query:"setPassword",
   "content":{
      shopId,
      password
   }	
}

output:{
	status:"success"
}
//  login 
{
	scope:"verification",
	query:"login",
	content:{
	  mobile,
	  password
	}
}
output:{
	status,
	undone,
	shopId
}

//setOwnerName 
addowner name
{
	scope:shopRegistration
	query:setOwnerName
	content:{
	shopId,
	ownerName
	}
}
output:{
	status
} 