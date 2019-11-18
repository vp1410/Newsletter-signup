const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(request,response){
	response.sendFile(__dirname + "/signup.html")
	});
app.post("/",function(req,resp){
	var fname = req.body.firstName;
	var lname = req.body.lastName;
	var email = req.body.email;
	//console.log(fname,lname,email);
	var data ={
		members:[
		{
			email_address:email,
			status:"subscribed",
			merge_fields:{
				FNAME:fname,
				LNAME:lname
			}
		}
		]
	};
	var jsonData = JSON.stringify(data);
	var options ={
		url:"https://us3.api.mailchimp.com/3.0/lists/3348820ca9",
		method:"POST",
		headers:{
			"Authorization":"vivek 185fc29f681471be3b4719e6cf605c07-us3"
		},
		//body:jsonData
	};
	request(options,function(error,response,body){
		if(error){
			resp.sendFile(__dirname + "/failure.html");
		}else{
			if(response.statusCode === 200){
				resp.sendFile(__dirname + "/success.html")
			}else{
				resp.sendFile(__dirname + "/failure.html");
			}
		}
	});
	
	});
app.post("/failure",function(req,resp){
	resp.redirect("/");
});
	
app.listen(5000,function(){
	console.log("Server is running on port 5000")
});

//API KEY
//185fc29f681471be3b4719e6cf605c07-us3

//LIST ID
//3348820ca9