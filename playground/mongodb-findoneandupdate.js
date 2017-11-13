//const MongoClient = require('mongodb').MongoClient;
// the following is same as above and used object structure
const {MongoClient, ObjectID} = require('mongodb');



//connect to the url of the database
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
	if (err) {
		return console.log('Unable to connect ot Mongo DB');
	}
	console.log('connected');
	


//**********************DELETE**************




//update operators

	db.collection('Todos').findOneAndUpdate({
		_id : new ObjectID('5a05abe53f47a5309d4650a8')

	},{
		$set : {
			completed :false
		}
	},{
		returnOriginal : false
	}).then((result)=> {
		console.log(`The item updated was ${result}`);
	})
	
// $set : set the field 

//increment operator
//{$inc : {<field1> :  <amount1>}}

	db.collection('Users').findOneAndUpdate({
		user  : 'mano'

	},{
		$inc : {
			age : 2
		}
	},{
		returnOriginal : false
	}).then((result)=> {
		console.log(result);
	})


//CLOSE the connection

	//db.close();
	
});