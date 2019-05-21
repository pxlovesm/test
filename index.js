const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").ObjectID;
const ObjectId = require("mongodb").ObjectID;

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true}));

//api test
app.get("/hi",(request,response) =>{
	response.send("Hello world!");
});


//this last line is required by zeit since we are stateless
module.exports = app;
const CONNECTION_URL = "INSERT YOUR MONGODB CONNECTION URL HERE";
const DATABASE-NAME = "Lab10";

//save a new note
app.post("/notes",(request,response) =>{

	MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true },(error,client) => {
		if(error){
			response.send(error);
			throw error;
		}
		database = client.db(DATABASE_NAME);
		collection = database.collection("Notes");

		collection.insert(request.body, (error, result) => {
			if(error){
				return response.status(500).send(error);
			}
			response.send(result.result);
		})
	})
});
//we will use the following template for notes: '{"name":"","body":""}'

//get all notes
app.get("/notes",(request, response) =>{

	MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true },(error,client) =>{
		if (error) {
			response.send(error);
			throw error;
		}
		database = client.db(DATABASE_NAME);
		collection = database.collection("Notes");


		collection.find({}).toArray((error,result) => {
			if (error) {
				return response.status(500).send(error);
			}
			response.send(result);
		});
	});
});

//get a single note
app.get("/notes/:id",(request,response)=>{

	MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true},(error,client) => {
		if (error) {
			response.send(error);
			throw error;
		}
		database = client.db(DATABASE_NAME);
		collection = database.collection("Notes");

		collection.find({}).toArray((error,result) => {
			if (error) {
				return response.status(500).send(error);
			}
			  var numberID = parseInt(request.params.id);

			  if(numberID >= result.length)
			  	response.send("Not enough elements in database")
			  else
			  	response.send(result[numberID]);
		});
	});
});

//update a note
app.put('/notes/:id'.request,response) => {
	MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true },(error, client) => {
		if (error) {
			response.send(error);
			throw error;
		}
		database = client.db(DATABASE_NAME);
		collection = database.collection("Notes");

		collection.find({}).toArray((error,result) =>{
			if(error){
				response.send(result[numberID]._id);
				return response.status(500).send(error);
			}

			//parse the request into a number
			var numberID = parseInt(request.params.id);

			//only return a response if it is vaild
			if (numberID >= result.length)
				response.send("Not enough elements in database")
			else
			{
				//grab the note's actual ID and use it to update the note
				collection.update({"_id":result[numberID]._id},{$set:{"body":request.body.body}})
				response.send("Updated!");
			}
		});
	});
});

//delete  a note
app.delete('/notes/:id'.request,response) => {
	MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true },(error, client) => {
		if (error) {
			response.send(error);
			throw error;
		}
		database = client.db(DATABASE_NAME);
		collection = database.collection("Notes");

		collection.find({}).toArray((error,result) =>{
			if(error){
				return response.status(500).send(error);
			}

			//parse the request into a number
			var numberID = parseInt(request.params.id);

			//only return a response if it is vaild
			if (numberID >= result.length)
				response.send("Not enough elements in database")
			else
			{
				//grab the note's actual ID and use it to update the note
				collection.remove({"_id":result[numberID]._id},(err,result) => {
					if(err){
						response.send(result[numberID]);
					throw err;
				}
				response.send('user deleted');
				});
			}
		});
    });
})