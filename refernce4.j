// owner deetails
{
	scope : shopProfile 
	query : getOwnerDetails
	content:{
	 shopId
	}
}
output
{
	status,
	owner
}

// getshop details
{
	scope: shopProfile,
	query : getShopDetails
	content :{
	shopId
	}
}
output 
{
	status,
	shopSex,
	shopType,
	shopName,
    shopAddress
}