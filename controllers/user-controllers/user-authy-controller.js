/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const User = require('../../models/users-models/user');
let express = require('express');
let router = express.Router();
const twilio = require('twilio');
const bcrypt = require('bcryptjs');
let auth = require('../../services/auth-service');
let code = '';
let code2 = '';

// Login Method
router.authyLogin = (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	const { email } = req.body;
	User.findOne({ email })
		.then(user => {
			if (!user) {
				return res.send({message: false});
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then(match => {
					if (!match) {
						return res.status(401).send({ auth: false, token: null, message:"password"});
					}
					const token = auth.generateJWT(user);
					return res
						.status(200)
						.send({ auth: true, message: 'Login Successful', token: token });
				})
				.catch(err => {
					return res.status(409).send({ error: err });
				});
		})
		.catch(err => {
			if (err) {
				return res.status(401).send(err);
			}
			return res.status(401).send(err);
		});
};

// Register Method
router.registerAuthy = (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	// checks to see if the email already exists
	User.find({ email: req.body.email })
		.exec()
		.then(user => {
			if (user.length >= 1) {
				//409 means conflict could use 422 which means unprocessable entity
				return res.send({ message: false });
			} else {
				const user = new User({
					fName: req.body.fName,
					lName: req.body.lName,
					email: req.body.email,
					phone: req.body.phone,
					password: req.body.password
				});
				user
					.save()
					.then(user => {
						const token = auth.generateJWT(user);
						res.status(200).send({ auth: true, token: token, message: true });
					})
					.catch(err => {
						res
							.status(500)
							.json({ message: 'Error Invalid Inputs', error: err });
					});
			}
		});
};

// Method to generate a random code for Sign-up
function randomCodeSignUp () {
	let chars = 'acdefhikmnoqrstuvwxyz0123456789ABCDEFGHJKLMNPQRSTUVWXYZ'.split(
		''
	);
	let count = 10;
	let result = '';
	for (let i = 0; i < count; i++) {
		let x = Math.floor(Math.random() * chars.length);
		result += chars[x];
	}
	return result;
};

// Method to see if the user email exists on the database already
router.authyUserCheckSignUpEmail = (req,res) => {
	res.setHeader('Content-Type', 'application/json');
	const { email } = req.body;
	User.findOne({ email })
		.then(user => {
			if (!user) {
				return res.send({message: true});
			}
			return res.send({message: false});
		}).catch(err => {
			res.status(501).json({ message: 'Error Invalid Inputs', error: err });
		});
};

// Method to send random code via text message for sign-up validation
router.validate = (req, res) => {
	let accountSid = process.env.TWILIO_ACCOUNT_SID; // The Account SID from Twilio
	let authToken = process.env.TWILIO_AUTH_TOKEN; // The Auth Token from Twilio
	let client = new twilio(accountSid, authToken);
	console.log(req.body)
	console.log(req.body.phone)
	code = randomCodeSignUp();
	client.messages
		.create({
			body: code, // Generated random code
			to: req.body.phone, // Text this number
			from: process.env.TWILIO_PHONE_NUMBER // From a valid Twilio number
		})
		.then((resp) => {
			console.log(resp)
			return res.status(200).send({ auth: true, message: true });
		})
		.catch(err => {
			res.status(501).json({ message: 'Error Invalid Inputs', error: err });
		});
};

// Authy code validation method for sign-up
router.validateCode = (req, res) => {
	if (req.body.vCode === code) {
		return res.status(200).send({ message: true });
	} else {
		return res.send({ message: false });
	}
};

router.deleteUser = (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	User.deleteOne({ '_id': req.params.id }).exec().then(promis => {
		res.status(200).json({ message: true, promis: promis });
	}).catch(err => {
		res.status(500).json({ message: false, error: err });
	});
};

// Find a users phone number via email send true to server if found false if not
// If found triger the validate function to send verification text to mobile number.
router.authyUserEmail = (req,res) => {
	res.setHeader('Content-Type', 'application/json');
	const { email } = req.body;
	User.findOne({ email })
		.then(user => {
			if (!user) {
				return res.send({message: false});
        
			}
			validateLogin(user.phone);
			return res.send({message: true});
		});
};

// Method to send random code via text message for login validation
function validateLogin (phone){
	let accountSid = process.env.TWILIO_ACCOUNT_SID; // The Account SID from Twilio
	let authToken = process.env.TWILIO_AUTH_TOKEN; // The Auth Token from Twilio
	let client = new twilio(accountSid, authToken);
	code2 = randomCodeLogin();
	client.messages
		.create({
			body: code2, // Generated random code
			to: phone, // Text this number
			from: process.env.TWILIO_PHONE_NUMBER // From a valid Twilio number
		})
		.then(() => {
			return res.status(200).send({ auth: true, message: true });
		})
		.catch(err => {
			res.status(500).json({ message: 'Error Invalid Inputs', error: err });
		});
};

// Authy code validation method for login
router.validateCodeLogin = (req, res) => {
	if (req.body.vCode === code2) {
		return res.status(200).send({ message: true });
	} else {
		return res.send({ message: false });
	}
};

 function randomCodeLogin () {
	let chars = '0123456789'.split(
		''
	);
	let count = 6;
	let result = '';
	for (let i = 0; i < count; i++) {
		let x = Math.floor(Math.random() * chars.length);
		result += chars[x];
	}
	return result;
};

module.exports = router;
