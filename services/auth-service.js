/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
let express = require('express');
let router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.generateJWT = user => {
	const tokenData = {
		fName: user.fName,
		lName: user.lName,
		id: user._id,
		email: user.email
	};
	const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
		expiresIn: 11300000, // 5 Minutes
		algorithm: 'RS256'
	});
	return token;
};

router.decodeToken = (req) => {
	const token = req.headers.authorization || req.headers
		['authenticate'];
	if (!token){
		return null;
	}
	try {
		return jwt.verify(token, process.env.SECRET_KEY);
	} catch (error){
		return null;
	}
};

router.getEmail= (req) => {
	const token = decodeToken(req);
	if (!token){
		return null;
	}
	return token.user.email;
};

router.getName= (req) => {
	const token = decodeToken(req);
	if (!token){
		return null;
	}
	return token.user.fName;
};

router.getUserID = (req) => {
	const token = decodeToken(req);
	if (!token){
		return null;
	}
	return token.user.id;
};

// Server to server connection test
router.helloBank = async (req,res) => {
	res.setHeader('Content-Type', 'application/json');
	await axios
		.get(process.env.WIT_BANK_SERVER + '/api/test/bank')
		.then(response => {
			console.log(response.data.message);
			return res.json(response.data.message);
		})
		.catch(error => {
			console.log(error);
		});
};

module.exports = router;
