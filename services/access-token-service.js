/* eslint-disable no-undef */
let express = require('express');
let router = express.Router();
const FiRecord = require('../models/financial-institution/financial-institution-details');
const FiDetails = require('../models/financial-institution/account');

router.getPostRefreshToken = (req, res) => {
	const fiName = 'Post Office';
	FiRecord.findOne({ fiName }).then(user => {
		let id = user.id;
		FiDetails.findOne({ financialInstitutionID: id }).then(resp => {
			let token = resp.accessToken;
			return res.send(token);
		});
	});
};

router.getAibRefreshToken = (req, res) => {
	const fiName = 'AIB';
	FiRecord.findOne({ fiName }).then(user => {
		let id = user.id;
		FiDdetails.findOne({ financialInstitutionID: id }).then(resp => {
			let token = resp.accessToken;
			return res.send(token);
		});
	});
};

router.getWitRefreshToken = (req, res) => {
	const fiName = 'Bank of WIT';
	FiRecord.findOne({ fiName }).then(user => {
		let id = user.id;
		FiDetails.findOne({ financialInstitutionID: id }).then(resp => {
			let token = resp.accessToken;
			return res.send(token);
		});
	});
};

router.getCuRefreshToken = (req, res) => {
	const fiName = 'Credit Union';
	FiRecord.findOne({ fiName }).then(user => {
		let id = user.id;
		FiDetails.findOne({ financialInstitutionID: id }).then(resp => {
			let token = resp.accessToken;
			return res.send(token);
		});
	});
};

module.exports = router;