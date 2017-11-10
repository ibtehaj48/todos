//const MongoClient = require('mongodb').MongoClient;
// the following is same as above and used object structure
const {MongoClient, ObjectID} = require('mongodb');



//connect to the url of the database
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
	if (err) {
		return console.log('Unable to connect ot Mongo DB');
	}
	console.log('connected');
	
	//to array returns a promise
/*	db.collection('Todos').find({
		_id : new ObjectID('5a057ed5ea36ea0da7986b22')
	})
	.toArray()
	.then((docs)=> {
		console.log('Todos');	
		console.log(JSON.stringify(docs, undefined, 3));
	},(err) => {
		console.log('unable to fetch todos', err);
	});
*/
	db.collection('Users')
	.find({user : 'abul'})
	.count()
	.then((count)=> {
		console.log('Todos');	
		console.log(count);
	},(err) => {
		console.log('unable to fetch todos', err);
	});

	db.collection('Users')
	.find({user : 'abul'})
	.toArray()
	.then((doc)=> {
		console.log('Todos');	
		console.log(doc);
	},(err) => {
		console.log('unable to fetch todos', err);
	})
	//db.close();

});