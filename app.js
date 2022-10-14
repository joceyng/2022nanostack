const express = require('express');
const app = express();
const PORT = 5000; // this is to allow the app to run locally //
const bodyParser = require('body-parser');
const https = require('https');
const cookieParser = require('cookie-parser');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

app.set('view engine', 'ejs');
app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
  }));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());



const MongoClient = require('mongodb').MongoClient;

const CONNECTION_URL = "mongodb+srv://joceyng:test@joceyng.hqak4.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "joceyng"; // you can change the database name
var database, collection;

MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
	if(error) throw error;
  
	database = client.db(DATABASE_NAME);
	collection = database.collection('newcollection');
});

app.get('/', (req, res) => {
    res.render('home', {title: "Home", name: req.body.name}); 
});

app.get('/about', (req, res) => {
    res.render('about', {title: "About"}); 
});

app.get('/portfolio', (req, res) => {
    res.render('portfolio', {title: "Portfolio"}); 
});

app.get('/contact', (req, res) => {
    res.render('contact', {title: "Contact"}); 
});

app.post('/', (req, res) => {
	collection.insertOne(req.body, (err, result) => {  
        if (err) return console.log(err)
        console.log('saved to database'); 
			       
       })
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
				  "pageUri": "https://dark-bee-dirndl.cyclic.app/contact",
				  "pageName": "Portfolio app contact page"
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
  app.listen(PORT, () => {
	console.log('This app is running on port ' + PORT)
  });   