const express = require('express');
const app = express();
const https = require('https');
const cookieParser = require('cookie-parser');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const MongoClient = require('mongodb').MongoClient;

const CONNECTION_URL = "mongodb+srv://joceyng:test@joceyng.hqak4.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "joceyng"; // you can change the database name
var database, collection;

MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
	if(error) throw error;
  
	database = client.db(DATABASE_NAME);
	collection = database.collection("newcollection");
	console.log("completed connection")
});


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render('home', {title: "Home", name: req.body.name}); 
});

app.get('/contact', (req, res) => {
    res.render('contact', {title: "Contact"}); 
});



  
app.post("/", function(req, res){
	setTimeout(() => {
	collection.insertOne(req.body, (err, result) => {  
        if (err) return console.log(err)
        console.log('saved to database'); 
			       
       })}, 1000);
	function formv3(){
		// Create the new request 
		var xhr = new XMLHttpRequest();
		var url = 'https://api.hsforms.com/submissions/v3/integration/submit/4718896/4f836c1a-cc7f-4df6-92fd-52d2f34f3e8d'
		    // Example request JSON:
			var data = {
				"fields": [
				  {
					"objectTypeId": "0-1",
					"name": "email",
					"value": req.body.email
				  },
				  {
					"objectTypeId": "0-1",
					"name": "firstname",
					"value": req.body.firstname
				  }
				],
				"context": {
				  "hutk": req.cookies.hubspotutk,
				  "pageUri": "https://dizzy-school-uniform-jay.cyclic.app/contact",
				  "pageName": "2022testing"
				}
			  }
		  
			  var final_data = JSON.stringify(data)
		  
			  xhr.open('POST', url);
			  // Sets the value of the 'Content-Type' HTTP request headers to 'application/json'
			  xhr.setRequestHeader('Content-Type', 'application/json');
		  
			  xhr.onreadystatechange = function() {
				  if(xhr.readyState == 4 && xhr.status == 200) { 
					  console.log(xhr.responseText); // Returns a 200 response if the submission is successful.
				  } else if (xhr.readyState == 4 && xhr.status == 400){ 
					  console.log(xhr.responseText); // Returns a 400 error the submission is rejected.          
				  } else if (xhr.readyState == 4 && xhr.status == 403){ 
					  console.log(xhr.responseText); // Returns a 403 error if the portal isn't allowed to post submissions.           
				  } else if (xhr.readyState == 4 && xhr.status == 404){ 
					  console.log(xhr.responseText); //Returns a 404 error if the formGuid isn't found     
				  }
				 }
		  
		  
			  // Sends the request 
			  
			xhr.send(final_data);
			
	}
	
	formv3(); 
	
	
	res.redirect('/'); // or do something else here	
	
	
});

 // Start the application after the database connection is ready
 app.listen(3000, () => {
	console.log('This app is running on port 3000')
  });  
 
