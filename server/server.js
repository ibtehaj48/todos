//Require Express and Body Parser
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');

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


//delete request
app.delete('/todos/:id',(req,res) => {

	var id = req.params.id;

	//validate. send 404 for invalid data query
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Todo.findByIdAndRemove(id).then((todos) => {

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



app.patch('/todos/:id', (req,res) => {

	console.log('patch request');

	var id = req.params.id;
	//pick takes a body and picks out properties if they exist
	var body = _.pick(req.body, ['text','completed']);

	//validate the ID
	if(!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	//checkif COMPLETED is boolean and set to true
	if (_.isBoolean(body.completed) && body.completed) {

		body.completedAt = new Date().getTime();	//JS timestamp

	} else {

		body.completed = false;
		body.completedAt = null;
	}

	//query to DB and update - FindByIdAndUpdate()
	Todo.findByIdAndUpdate(id, {
		$set : body
	}, {
		new : true
	})
	.then((todo) => {
		if (!todo) {
			res.status(404).send({text : 'ID not found'});
		}

		res.send({todo});

	})
	.catch((e) => {
		res.status(400).send();
	});

});


//App starts listening
app.listen(PORT, () => {
	console.log(`Starting the App.. ${PORT}`);
});


module.exports = {app};