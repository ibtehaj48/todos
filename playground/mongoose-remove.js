const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const {ObjectID} = require('mongodb');

//Use Mongoose to remove
// Todo.remove({})
// .then((result) => {
// 	console.log(result);
// });


//Todo.findOneAndRemove()

Todo.findByIdAndRemove('5a0cd21a9996ff0efef4157f')
.then((doc) => {
	console.log(JSON.stringify(doc,undefined,3));
});