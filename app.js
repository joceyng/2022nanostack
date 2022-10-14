const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render('home');
});

app.post('/', (req, res) => {
});

const MongoClient = require('mongodb').MongoClient;

const CONNECTION_URL = "mongodb+srv://joceyng:test@joceyng.hqak4.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "joceyng"; // you can change the database name
var database, collection;

MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
  if(error) throw error;

  database = client.db(DATABASE_NAME);
  collection = database.collection("testcollection"); // you can change the collection name

  // Start the application after the database connection is ready
  app.listen(3000, () => {
    console.log('This app is running on port 3000')
  });
});
