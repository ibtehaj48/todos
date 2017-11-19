const expect  = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {ObjectID} = require('mongodb');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');


//beforeEach V2 -add seed data
beforeEach(populateUsers);
beforeEach(populateTodos);

// beforeEach(() => {
// 	populateUsers();
// 	populateTodos();
// });

//later in the test we assume that the DB was empty and has only one item after adding
//we use beforeEach (like annotation) to wipe off the database clean 
//so the assumptuion above is valid
//We use remove({}) basically which means that delete anything having a NULL set i.e. ALL data
//beforeEach V1
// beforeEach((done) => {
// 	Todo.remove({})
// 	.then(() => done())
// });

// //creating a describe block POST
// describe('POST/todos',() => {

// 	//should create a new todo CASE
// 	it('should create a new todo', (done) => {
		
// 		//test text to be sent
// 		var text = 'Test todo next';
		
// 		//making the request to the app
// 		request(app)
// 		.post('/todos')	//post type request
// 		.send({text})	//sends the text
// 		.expect(200)	//status code
// 		.expect((res) => {
// 			//expect return text to be as sent text
// 			expect(res.body.text).toBe(text);
// 		})
// 		//end usually calls done(). We calla custom fuction 
// 		//if there is err it will call done with the error
// 		.end((err,res) => {
// 			if (err) {
// 				return done(err);
// 			}

// 			//if no error we just call the todo.find() to verify and attach a THEN with it.
// 			//Todo.find().then((todos) => { ||V2 to only find the record with test TEXT
// 			Todo.find({text}).then((todos) => {
// 				//expect the length of the todos to be 1 since only one item
// 				expect(todos.length).toBe(1); 	
// 				//expect the text of first document to be the one we sent
// 				expect(todos[0].text).toBe(text);
// 				//call done
// 				done();

// 			})	//we also have a catch block for the above THEN call. 
// 			.catch((e) => done(e));

// 		});
// 	});

// 	//create a test for empty body and should not create todo
// 	it('should not create a todo with empty body', (done) => {

// 		//requesting to the app with a post to todos route
// 		request(app)
// 		.post('/todos')
// 		.send({})			//sending empty body
// 		.expect(400)		//expecting 400 for error
// 		.end((err,res) => {
// 			//if error call done. return to stop the function
// 			if (err) {
// 				return done(err);
// 			}

// 			//finding a todos and expect length to be 0
// 			Todo.find().then((todos) => {
// 				// expect(todos.length).toBe(0); modified to 2 for seed data
// 				expect(todos.length).toBe(2);
// 				console.log('todos is empty');
// 				done();
// 			})
// 			.catch((e) => done(e));

// 		});

// 	});
// });
// //test Get todos
// describe('GET /todos', () => {
// 	it('should get all the todos', (done) => {

// 		request(app)
// 		.get('/todos')
// 		.expect(200)
// 		.expect((res) => {
// 			expect(res.body.todos.length).toBe(2);
// 		})
// 		.end(done);

// 	});
// });
// //Test GET
// describe('GET/todos/:id', () => {
// 	it('should return todo doc', (done) => {

// 		request(app)
// 		.get(`/todos/${todos[0]._id.toHexString()}`)
// 		.expect(200)
// 		.expect((res) => {
// 			expect(res.body.todos.text).toBe(todos[0].text);
// 		})
// 		.end(done);

// 	});

// 	it('should return a 200 and \'ID not found\'', (done) => {

// 		//REAL Id but not in DB
// 		var _idf = new ObjectID();

// 		request(app)
// 		.get(`/todos/${_idf.toHexString()}`)
// 		.expect(200)
// 		.expect((res) => {
// 			// console.log('\n\n\n Not found in DB BODY :\n\n');
// 			// console.log(res.body.text);
// 			expect(res.body.text).toBe('ID not Found');
// 		})
// 		.end(done);

		

// 	});

// 	it('should return a 404 for INVALID ID', (done) => {

// 		//Invalid ID
// 		request(app)
// 		.get(`/todos/123`)
// 		.expect(404)
// 		.end(done);

// 	});
// });
// //TESTING the delete route
// describe('DELETE /todos', () => {

// 	it('should remove a todo', (done) => {

// 		var id = todos[0]._id.toHexString();

// 		request(app)
// 		.delete(`/todos/${id}`)
// 		.expect(200)
// 		.expect((res) => {
// 			expect(res.body.todos.text).toBe(todos[0].text);
// 		})
// 		//actually validate to see if the item was delete
// 		.end((err,res) => {
			
// 			if (err) {
// 				return done(err);
// 			}

// 			Todo.findById(id)
// 			.then((todo) => {
// 				expect(todo).toBeFalsy();
// 				done();
// 			})
// 			.catch((e) => done(e));


// 		});

// 	});

// 	it('should return 404 when item not found but correct format', (done) => {

// 		var id = new ObjectID().toHexString();

// 		request(app)
// 		.delete(`/todos/${id}`)
// 		.expect(200)
// 		.expect((res) => {
// 			expect(res.body.text).toBe('ID not Found');
// 		})
// 		.end(done);

// 	});

// 	it('it should return 404 for invalid ID', (done) => {

// 		var id = '456asdf';

// 		request(app)
// 		.delete(`/todos/${id}`)
// 		.expect(404)
// 		.end(done);


// 	});
// });
// //Testing the UPDATE with PATCH route
// describe('PATCH /todos/:id', () => {

// 	it('should update the todo', (done) => {
// 		var id = todos[0]._id.toHexString();
// 		var text = 'updated text';

// 		request(app)
// 		.patch(`/todos/${id}`)
// 		.send({
// 			text,
// 			completed : true
// 		})
// 		.expect(200)
// 		.expect((res) => {
// 			console.log(res.body);
// 			expect(res.body.todo.text).toBe(text);
// 			expect(res.body.todo.completed).toBe(true);
// 			expect(typeof(res.body.todo.completedAt)).toBe('number');
// 		})
// 		.end(done);
// 	});

// 	//toggle 
// 	it('should clear copletedAt when todo is not commpleted', (done) => {

// 		var id = todos[1]._id.toHexString();
// 		var text = 'updated new text';

// 		request(app)
// 		.patch(`/todos/${id}`)
// 		.send({
// 			text,
// 			completed : false
// 		})
// 		.expect(200)
// 		.expect((res) => {
// 			console.log(res.body);
// 			expect(res.body.todo.text).toBe(text);
// 			expect(res.body.todo.completed).toBe(false);
// 			expect(res.body.todo.completedAt).toBeFalsy();
// 		})
// 		.end(done);
// 	});
// });

describe('GET /users/me', () => {

	it('should return user if authenticated', (done) => {

		request(app)
		.get('/users/me')
		.set('x-auth', users[0].tokens[0].token)
		.expect(200)
		.expect((res) => {
			expect(res.body._id).toBe(users[0]._id.toHexString());
			expect(res.body.email).toBe(users[0].email);
		})
		.end(done);
	});

	it('should return 401 if not authenticated',(done) => {

		request(app)
		.get('/users/me')
		.expect(401)
		.expect((res) => {
			expect(res.body).toEqual({});
		})
		.end(done);

	});
});

describe('POST /users', () => {

	it('shoud create a new user', (done) => {
		var email = 'sarmis@gmail.com';
		var password = '1234validPass';

		request(app)
		.post('/users')
		.send({email, password})
		.expect(200)
		.expect((res) => {
			expect(res.headers['x-auth']).toBeDefined();
			expect(res.body._id).toBeDefined();
			expect(res.body.email).toBe(email);
		})
		.end((err) => {
			if (err) {
				done(err);
			}

			User.findOne({email}).then((user) => {
				expect(user).toBeDefined();
				expect(user.password).not.toBe(password);
				done();
			})
		});
	});

	it('shoud return validation error for invalid request', (done) => {
		var iemail = 'adfaf.v';
		var ipassword = 'ads';

		request(app)
		.post('/users')
		.send({iemail,ipassword})
		.expect(400)
		.end(done);

	});

	it('should not create user if already exist', (done) => {

		var email = users[0].email;
		var password = '1234validPass';

		request(app)
		.post('/users')
		.send({email, password})
		.expect(400)
		.end(done);

	});

});