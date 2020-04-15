/* eslint-disable no-undef */
let express = require('express');
let router = express.Router();
const axios = require('axios');
let message = 'Successful Login';
let FiRecord = require ('../../models/financial-institution/financial-institution-details.js');
let TokenService = require('../../services/fi-token-service');

// Method to create a collection on the mongo db server containing a list of fi details.
// The details stored on each fi is FI name and FI id.
router.getAllFIDetails = async (req,res) => {
	res.setHeader('Content-Type', 'application/json');
	const requestCU = axios.get(
		process.env.CREDIT_UNION_SERVER + 'api/fi/get-details'
	);
	const requestPost = axios.get(
		process.env.AN_POST_SERVER + 'api/fi/get-details'
	);
	const requestWIT = axios.get(
		process.env.WIT_BANK_SERVER + 'api/fi/get-details'
	);
	const requestAIB = axios.get(
		process.env.AIB_BANK_SERVER + 'api/fi/get-details'
	);
	await axios
		.all([requestCU, requestPost, requestWIT, requestAIB])
		.then(
			await axios.spread((requestCU, requestPost, requestWIT, requestAIB) => {
				const fiRecord = new FiRecord({
					fiName: requestCU.data.fiAccount.fiName,
					id: requestCU.data.fiAccount.id
				});
				fiRecord.save();
				const fiRecordPost = new FiRecord({
					fiName: requestPost.data.fiAccount.fiName,
					id: requestPost.data.fiAccount.id
				});
				fiRecordPost.save();
				const fiRecordWIT = new FiRecord({
					fiName: requestWIT.data.fiAccount.fiName,
					id: requestWIT.data.fiAccount.id
				});
				fiRecordWIT.save();
				const fiRecordAIB = new FiRecord({
					fiName: requestAIB.data.fiAccount.fiName,
					id: requestAIB.data.fiAccount.id
				});
				fiRecordAIB.save();
				return res.status(200).send({message: true});
			})
		)
		.catch(error => {
			return res.status(402).json({ message: 'Invalid!' });
		});
};


// Financial Institution Login Methods, for refresh and access tokens. 
// Each method saves the corrisponding token to the database for later use in financial instution calls.

router.loginRefreshAIB = async (req,res) => {
	res.setHeader('Content-Type', 'application/json');
	const user = { email: req.body.email, password: req.body.password};
	// Get token in header. Used to check who the userID is.
	const decodeToken  = TokenService.decodeHeaderToken(req);
	const userID = TokenService.getUserID(decodeToken);
	await axios
		.post(`${process.env.AIB_BANK_SERVER}/api/user/login/refresh`, user)
		.then(response => {
			if (response.auth === false){ return res.status(401).send({auth: false, token: null, message: 'Invalid Login'});}
			let tokenB = response.data.token;
			TokenService.saveRefreshToken(tokenB,userID);
			return res.status(200).send({message});
		})
		.catch(error => {
			return res.status(408).send({auth: false, token: null, message: 'Invalid Login'});
		});
};

router.loginRefreshWIT = async (req,res) => {
	res.setHeader('Content-Type', 'application/json');
	const user = { email: req.body.email, password: req.body.password};
	// Get token in header. Used to check who the userID is.
	const decodeToken  = TokenService.decodeHeaderToken(req);
	const userID = TokenService.getUserID(decodeToken);
	await axios
		.post(`${process.env.WIT_BANK_SERVER}/api/user/login/refresh`, user)
		.then(response => {
			if (response.auth === false){ return res.status(401).send({auth: false, token: null, message: 'Invalid Login'});}
			let tokenB = response.data.token;
			TokenService.saveRefreshToken(tokenB,userID);
			return res.status(200).send({message});
		})
		.catch(error => {
			return res.status(409).send({auth: false, token: null, message: 'Invalid Login'});
		});
};

router.loginRefreshCU = async (req,res) => {
	res.setHeader('Content-Type', 'application/json');
	const user = { email: req.body.email, password: req.body.password};
	// Get token in header. Used to check who the userID is.
	const decodeToken  = TokenService.decodeHeaderToken(req);
	const userID = TokenService.getUserID(decodeToken);
	await axios
		.post(`${process.env.CREDIT_UNION_SERVER}/api/user/login/refresh`, user)
		.then(response => {
			if (response.auth === false){ return res.status(401).send({auth: false, token: null, message: 'Invalid Login'});}
			let tokenB = response.data.token;
			TokenService.saveRefreshToken(tokenB,userID);
			return res.status(200).send({message});
		})
		.catch(error => {
			return res.status(409).send({auth: false, token: null, message: 'Invalid Login'});
		});
};

router.loginRefreshPost = async (req,res) => {
	res.setHeader('Content-Type', 'application/json');
	const user = { email: req.body.email, password: req.body.password};
	// Get token in header. Used to check who the userID is.
	const decodeToken  = TokenService.decodeHeaderToken(req);
	const userID = TokenService.getUserID(decodeToken);
	await axios
		.post(`${process.env.AN_POST_SERVER}/api/user/login/refresh`, user)
		.then(response => {
			if (response.auth === false){ return res.status(401).send({auth: false, token: null, message: 'Invalid Login'});}
			let tokenB = response.data.token;
			TokenService.saveRefreshToken(tokenB,userID);
			return res.status(200).send({message});
		})
		.catch(error => {
			return res.status(409).send({auth: false, token: null, message: 'Invalid Login'});
		});
};

// Get access token
router.loginAccessWIT = async (req,res) => {
	const user = { email: req.body.email, password: req.body.password};
	res.setHeader('Content-Type', 'application/json');

	await axios
		.post(`${process.env.WIT_BANK_SERVER}/api/user/login/access`, user)
		.then(response => {
			let tokenA = response.data.token;
			TokenService.saveAccessToken(tokenA);
			return res.status(200).send({message});
		})
		.catch(error => {
			return error
		});
};

// Get access token
router.loginAccessAIB = async (req,res) => {
	const user = { email: req.body.email, password: req.body.password};
	res.setHeader('Content-Type', 'application/json');
	await axios
		.post(`${process.env.AIB_BANK_SERVER}/api/user/login/access`, user)
		.then(response => {
			let tokenA = response.data.token;
			TokenService.saveAccessToken(tokenA);
			return res.status(200).send({message});
		})
		.catch(error => {
			return error
		});
};

// Get access token
router.loginAccessPost = async (req,res) => {
	const user = { email: req.body.email, password: req.body.password};
	res.setHeader('Content-Type', 'application/json');
	await axios
		.post(`${process.env.AN_POST_SERVER}/api/user/login/access`, user)
		.then(response => {
			let tokenA = response.data.token;
			TokenService.saveAccessToken(tokenA);
			return res.status(200).send({message});
		})
		.catch(error => {
			return error
		});
};

// Get access token
router.loginAccessCU = async (req,res) => {
	const user = { email: req.body.email, password: req.body.password};
	res.setHeader('Content-Type', 'application/json');
	await axios
		.post(`${process.env.CREDIT_UNION_SERVER}/api/user/login/access`, user)
		.then(response => {
			let tokenA = response.data.token;
			TokenService.saveAccessToken(tokenA);
			return res.status(200).send({message});
		})
		.catch(error => {
			return error
		});
};

module.exports = router;