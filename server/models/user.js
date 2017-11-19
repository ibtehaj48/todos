const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt =require('bcryptjs');

var UserSchema = new mongoose.Schema({

	email : {
		type : String,
		required : true,
		minlength : 1,
		trim : true,
		unique : true,
		//custome validate property
		validate : {
			validator : validator.isEmail,
			message : '{VALUE} is not a valid Email'
		}		
	},
	password : {
		type : String,
		required : true,
		minlength : 6
	},
	tokens : [{
		access : {
			type : String,
			required : true
		},
		token : {
			type : String,
			required : true
		}
	}]
});
//We need a function on the instance to only choose key value pairs we want to send back and
//NOT include other info like tokens
UserSchema.methods.toJSON = function () {
	var user = this;
	var userObject = user.toObject();

	return _.pick(userObject, ['_id','email']);
};
//token will have information on type of access - usually auth (can be password reset etc)
//so a token is signed with information in a object with ID and Auth type
UserSchema.methods.generateAuthToken = function () {

	//user refers to THIS user and the properties can be accesses by user.<property name>
	var user = this;
	//this function generates authentication token so acess type is auth
	var access = 'auth';
	//the token has the User ID and Access type and a SALT string
	var token = jwt.sign({
		_id : user._id.toHexString(),
		access 
	}, 'abc123')
	.toString();

	//once the token is generated it gets pused to the TOKENS ARRAY of THIS user
	user.tokens.push({access, token});


	//user.save will save the new THIS user record
	//the save will returns a promise where we return the token.
	//we can chain in another then (token) => {some function} to handle that. but that twill be done in the server
	//so we simply return the entire user.save() call and the final promise will be handled in the server
	//the token returned will be used as the success argument

	return user.save().then(() => {
		return token;
	});
	//basically token is returned to the the first save call and whoch is again returned to the 
	//calling func
};
//This is not a document specific function but applies to the User Schema Model in general
UserSchema.statics.findByToken = function (token) {
	var user = this;
	var decoded;

	try {
		decoded = jwt.verify(token, 'abc123');
	} catch (e) {
		return Promise.reject();
	}

	return User.findOne({
		'_id' : decoded._id,
		'tokens.token' : token,
		'tokens.access' : 'auth'
	});
};

//find by credentials to check in login
UserSchema.statics.findByCredentials = function (email, password) {
	var User = this;

	return User.findOne({email}).then((user) => {
		if(!user) {
			return Promise.reject();
		}

		return new Promise((resolve,reject) => {
			bcrypt.compare(password, user.password, (err,res) => {
				if (res) {
					resolve(user);
				} else {
					reject();
				}
			});
		});

	});

};

//mongoose middleware
UserSchema.pre('save', function (next) {
	var user = this;

	if (user.isModified('password')) {

		bcrypt.genSalt(10, (err,salt) => {
			bcrypt.hash(user.password, salt, (err,hash) => {
				user.password = hash;
				next();		
			});
		});

	} else {
		next ();
	}
});
//model for Users
var User = mongoose.model('User', UserSchema);
//Export the User Model
module.exports = {
	User
}