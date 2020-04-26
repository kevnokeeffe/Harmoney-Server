/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
let express = require('express');
let router = express.Router();
require('dotenv').config();

router.generateJWT = user => {
	const tokenData = {
		fName: user.fName,
		lName: user.lName,
		id: user._id,
		email: user.email,
		phone: user.phone
	};

	let verifyOptions = {
		expiresIn:  1000000
	   };

	const token = jwt.sign(tokenData, process.env.SECRET_KEY, verifyOptions);
	return token;
};

module.exports = router;
