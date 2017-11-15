const expect  = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');


//later in the test we assume that the DB was empty and has only one item after adding
//we use beforeEach (like annotation) to wipe off the database clean 
//so the assumptuion above is valid
//We use remove({}) basically which means that delete anything having a NULL set i.e. ALL data
beforeEach((done) => {
	Todo.remove({})
	.then(() => done())
});

//creating a describe block
describe('POST/todos',() => {

	//should create a new todo CASE
	it('should create a new todo', (done) => {
		
		//test text to be sent
		var text = 'Test todo next';
		
		//making the request to the app
		request(app)
		.post('/todos')	//post type request
		.send({text})	//sends the text
		.expect(200)	//status code
		.expect((res) => {
			//expect return text to be as sent text
			expect(res.body.text).toBe(text);
		})
		//end usually calls done(). We calla custom fuction 
		//if there is err it will call done with the error
		.end((err,res) => {
			if (err) {
				return done(err);
			}

			//if no error we just call the todo.find() to verify and attach a THEN with it.
			Todo.find().then((todos) => {
				//expect the length of the todos to be 1 since only one item
				expect(todos.length).toBe(1); 	
				//expect the text of first document to be the one we sent
				expect(todos[0].text).toBe(text);
				//call done
				done();

			})	//we also have a catch block for the above THEN call. 
			.catch((e) => done(e));

		});
	});

	//create a test for empty body and should not create todo
	it('should not create a todo with empty body', (done) => {

		//requesting to the app with a post to todos route
		request(app)
		.post('/todos')
		.send({})			//sending empty body
		.expect(400)		//expecting 400 for error
		.end((err,res) => {
			//if error call done. return to stop the function
			if (err) {
				return done(err);
			}

			//finding a todos and expect length to be 0
			Todo.find().then((todos) => {
				expect(todos.length).toBe(0);
				console.log('todos is empty');
				done();
			})
			.catch((e) => done(e));

		});

	});

});

