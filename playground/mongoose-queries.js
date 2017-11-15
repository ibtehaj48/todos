const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const {ObjectID} = require('mongodb');

var id = '5a0c23fc7dab858a49e91b80';
var uid = '5a09a15082a0632a284a4eda';

if(!ObjectID.isValid(uid)) {
	console.log('ID not valid');
}

//mongoose will automatically convert the string to an ID and we dont need to construct it
//return an ARRAY
//when ID doesnt match it doesnt throw error and sends an EMPTY ARRAY
// Todo.find({
// 	_id : id
// })
// .then((todos) => {
// 	console.log('Todos', todos);
// });

// //Return only an OBJECT
// //returns NULL
// Todo.findOne({
// 	_id : id
// })
// .then((todo) => {
// 	console.log('Todo', todo);
// });

//find by ID. can directly take a string argument
//Returns a NULL
// Todo.findById(id)
// .then((todo) => {

// 	//when todo is null it is false
// 	if (!todo) {
// 		return console.log('ID not found');
// 	}
// 	console.log('Todo by ID', todo);
// })
// .catch((e) => {
// 	console.log(e);
// });



User.findById(uid)
.then((user) => {
	if (!user) {
		return console.log('User Not Found');
	}

	console.log('User',user);

})
.catch((e) => {
	console.log(e);
});


