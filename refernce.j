server will need only two routes: one for post and one for get requests


app.get('/dataBaseRead',****){
    determine which function to call using scope and query part of req.
}

app.post('/dataBaseModify',****){
    determine which function to call using scope and query part of req.
}




************routes for user(otp) verification***************

shop owner mobile no will be id of shop id.


1.(to request otp)
=>input
{
    scope:"verification",
    query:"sendOTP"
    content:
    {
     mobile:"########"
    }
}

=>output:
{
    status:"send or failed"
}


2.(to verify otp enter by user)

=>input
{
    scope:"verification",
    query:"verifyOTP"
    content:{
     mobile:"########"
     otp:"6 digit number"
    }    
}

=>output

{
    status:" verified or failed or timeOut"
}


3.(to resend OTP)

=>input
{
    scope:"verification",
    query:"resend"
    content:{
     mobile:"########"
    }  
}

=>output

{
    status:"resend or error"
}


***************************************Routes for shop registration*******************

1.(request for shop registration)

what if location given by shop owner and given by lat,log don't match
=>input
{
    scope:"shopRegistration",
    query:"registerShop",
    content:{
    shopName:"",
    shopType:"spa or saloon or (spa +saloon)",
    shopAddress:"entered by owmner",
    lat:"lattitde of shop",
    log:"longitude of shop"
    }
}

=>output:
{
    status:"registerd or failed"
}


************************************Routes of service*******************


1.
=>input

{
    scope:"service",
    query:"add",
    content:{
    domain:"hair,nail,or body",
    service:"ex- cutting",
    price:"a number",
    shopId:" mobile number(with country code)"
    }
}

=>output
{
    stauts:"serviceAdded or failed"
}

**********************************Routes of package***************

1.
=>input
{
    scope:"package",
    query:"add",
    content:{
    servcies:[{
            domain:"hair,nail or body",
            service:"cutting"
    }],
    price:"price of package",
    shopId:" mobile number(with country code)"
    }
}

=>output
{
    stauts:"packageAdded or failed"
}