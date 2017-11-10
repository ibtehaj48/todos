//const MongoClient = require('mongodb').MongoClient;
// the following is same as above and used object structure
const {MongoClient, ObjectID} = require('mongodb');

/*
var user = {
	name : 'mary jane',
	age : 23,
};

var {name} = user;
*/

/*
var obj = new ObjectID();
console.log(obj);
*/


//connect to the url of the database
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
	if (err) {
		return console.log('Unable to connect ot Mongo DB');
	}
	console.log('connected');
	
/*	db.collection('Todos').insertOne(({
		text : 'task to do',
		completed : false

	}), (err, result) => {
		if (err) {
			return console.log('unable to connect', err);
		}
		console.log(JSON.stringify(result.ops,undefined,3));
	});
*/
//nsert new doc Users collection (name, age, location)
	
	db.collection('Users').insertOne(({
		user : 'abul',
		age : 25,
		location : 'kiel'
	}), (err,result) => {

		if (err) {
			return console.log('unable to insert user', err);
		}
		console.log(result.ops[0]._id.getTimestamp());
	});
	

	db.close();

});