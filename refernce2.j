*******************Routest for Edit,Delete*********************

1. service edit(only price can be edit)

input:{
     scope:"service",
     query:"edit",
     content:{
     	serviceId:"",
     	newPrice:""
     }
}

outPut: {
	status:"failed or success"
}

2.deleteService

input:{
    scope:"service",
    query:"delete", 
	content:{
		serviceId:"",
		shopId:"to delete service from shop"
	}
}

output:{
	status:"failed or success"
}


3.edit a package

input:{
	scope:"package",
	query:"edit",
	content:{
	    packageId:"", 
		services:["its an array of id(mongoId) which service to be delete"],
		newPrice:""
	}
}

output:{
	status:"failed or success"
}


4.delete package

input:{
	scope:"package",
	query:"delete"
	content:{
		shopId:"",
		packageId:""
	}
}


output:{
	status:"failed or success"
}



5.to get Services

input:{
	scope:"service",
	query:"get",
	content:{
		serviceId:"service after which new service to get. null in case first call"
	}
}

output:{
	services:[{domain:"hair etc",name:"cutting etc",price:""}];
}