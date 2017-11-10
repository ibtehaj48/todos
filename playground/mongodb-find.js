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

/*
	db.collection('Users')
	.find({user : 'abul'})
	.count()
	.then((count)=> {
		console.log('Todos');	
		console.log(count);
	},(err) => {
		console.log('unable to fetch todos', err);
	});

*/

/*
	db.collection('Users')
	.find({user : 'abul'})
	.toArray()
	.then((doc)=> {
		console.log('Todos');	
		console.log(doc);
	},(err) => {
		console.log('unable to fetch todos', err);
	})

*/

//**********************DELETE**************
//delete many

/*	db.collection('Todos').deleteOne({text : 'task to do'})
	.then((result) => {
		console.log(JSON.stringify(result,undefined,2));
	});
*/
	//findOne and delete
/*	db.collection('Todos').findOneAndDelete({completed : false})
	.then((result) => {

		console.log(result);	
	});
*/

//delete multiple entries
/*
	db.collection('Users').deleteMany({user : 'abul'})
	.then((result)=> {
		console.log(JSON.stringify(result,undefined,2));
	});
*/

//delete one with id
	db.collection('Users').findOneAndDelete({
		_id : new ObjectID('5a0596877400ef11ae2612e7')
	})
	.then((result)=> {
		console.log(result);
	});
	//db.close();
	

});