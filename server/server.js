//Require Express and Body Parser
var express = require('express');
var bodyParser = require('body-parser');

//Require the local modules and 
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectID} = require('mongodb');

var app = express();
const PORT = process.env.PORT || 3000;

//middleware use
app.use(bodyParser.json());

//route for todos
app.post('/todos',(req,res) => {

	//display the post data
	console.log('New POST req \n',req.body);

	//create a new todo entry using the req.body
	var todo = new Todo({
		text : req.body.text
	});

	//save the data
	todo.save().then((doc) => {
		//when save is succesful send back the DOCUMENT 
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});

});

//route for GET todos
app.get('/todos', (req,res) => {

	Todo.find().then((todos) => {
		res.send({todos});
	}, (e) => {
		res.status(400).send(e);
	});

});

//route for GET /todos/:id
app.get('/todos/:id', (req,res) => {

	var id = req.params.id;

	//validate
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	//find
	Todo.findById(id).then((todos) => {

		//if ID not found
		if(!todos) {
			return res.send({text : 'ID not Found'});
		} else {
			res.send({todos});
		};

	}, (e) => {
		res.status(400).send(e);
	});

});


//App starts listening
app.listen(PORT, () => {
	console.log(`Starting the App.. ${PORT}`);
})

module.exports = {app};