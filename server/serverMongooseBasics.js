const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');
//automatically wait fro the async callback to wait
//tell mongoose that we will use the built in promise

//create a model for everything we store
// EG todo.. like a table design in structured db

//creating a todo model
// var Todo = mongoose.model('Todo', {
// 	text : {
// 		type : String
// 	},
// 	completed : {
// 		type : Boolean
// 	},
// 	completedAt: {
// 		type : Number
// 	}
// });

//add one todo for example
// name here is not imp. constructor


// var newTodo = new Todo({
// 	text : 'call abbujaan',
// });

// //call a method to save and write newTodo to handle the promise
// newTodo.save()
// .then((doc)=> {
// 	console.log('Save Todo' , doc);
// }, (e)=> {
// 	console.log(e);
// });

//thought process : first create a new entry 
// on a variable with a constructor. 
// then call method on the constructor. eg. save and delete.
// then handle the promise

/************************challenge***********************************/

// var Todo = mongoose.model('Todo', {
// 	text : {
// 		type : String,
// 		required :true,
// 		minlength : 1,
// 		trim: true
// 	},
// 	completed : {
// 		type : Boolean,
// 		default : false
// 	},
// 	completedAt: {
// 		type : Number,
// 		default : null
// 	}
// });

// //mongoose typecasts the type. BE CAREFULL
// var newTodo1 = new Todo({
// 	text : 'buy rode NT1a'
// });

// 	newTodo1.save()
// 	.then((doc)=> {
// 		console.log('Save Todo' , doc);
// 	}, (e)=> {
// 		console.log(e);
// 	});


//User
//email - required, trim set type string, min length1

var Users = mongoose.model('Users',{
	email : {
		type : String,
		required : true,
		minlength : 1,
		trim : true
	}
});

var newUser = new Users ({
	email : 'ascac@adcsc.asccom'
});

newUser.save()
.then((doc)=>{
	console.log(doc);
}, (e) => {
	console.log(e);
});



