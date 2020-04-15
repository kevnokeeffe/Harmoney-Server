/* eslint-disable no-unused-vars */
/* eslint-disable no-self-assign */
/* eslint-disable no-undef */
let express = require('express');
let router = express.Router();
const axios = require('axios');
const FiRecord = require('../../models/financial-institution/financial-institution-details');
const FiDetails = require('../../models/financial-institution/account');

// CURRENT ACCOUNT GET METHODS

// Get all WIT Current Accounts - Working
router.getAllWITcurrentAccounts = async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	let refreshToken = null;
	let name = 'Bank of WIT';
	FiRecord.findOne({ fiName: name }).then(user => {
		let id = user.id;
		FiDetails.findOne({ financialInstitutionID: id })
			.then(resp => {
				if (resp !== null){
					refreshToken = resp.refreshToken;
					}
			})
			.then(async () => {
				if (refreshToken!==null){
					await axios
						.get(process.env.WIT_BANK_SERVER + '/api/account/find-current-all', {
							headers: {
								Authorization: refreshToken
							}
						})
						.then(response => {
							let account = response.data.account;
							const currentAccounts = [
								(account = account)
							]
							if(account!==undefined){
								return res.status(200).send({ currentAccounts,message:true });
								}
								if(!account){res.send({message:false})}
						})
						.catch(error => {
							return res.send({ message: false });
						});
				} // end of if statement
				else {
					return res.send({message: false});
				}
			});
	});
};

// Method to get all AIB Current Accounts
router.getAllAIBcurrentAccounts = async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	let refreshToken = null;
	let name = 'AIB';
	FiRecord.findOne({ fiName: name }).then(user => {
		let id = user.id;
		FiDetails.findOne({ financialInstitutionID: id })
			.then(resp => {
				if (resp !== null){
					refreshToken = resp.refreshToken;}
			})
			.then(async resp => {
				if (refreshToken!==null){
					await axios
						.get(process.env.AIB_BANK_SERVER + '/api/account/find-current-all', {
							headers: {
								Authorization: refreshToken
							}
						})
						.then(response => {
							let account = response.data.account;
							const currentAccounts = [
								(account = account)
							];
							if(account!==undefined){
								return res.status(200).send({ currentAccounts,message:true });
								}
								else{res.send({message:false})}
						})
						.catch(error => {
							return res.send({ message: false });
						});
				} // end of if statement
				else {
					return res.send({message: false});
				}
			});
	});
};

// Method to get all An Post Current Accounts
router.getAllPostCurrentAccounts = async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	let refreshToken = null;
	let name = 'Post Office';
	FiRecord.findOne({ fiName: name }).then(user => {
		let id = user.id;
		FiDetails.findOne({ financialInstitutionID: id })
			.then(resp => {
				if (resp !== null){
					refreshToken = resp.refreshToken;}
			})
			.then(async () => {
				if (refreshToken!==null){
					await axios
						.get(process.env.AN_POST_SERVER + '/api/account/find-current-all', {
							headers: {
								Authorization: refreshToken
							}
						})
						.then(response => {
							let account = response.data.account;
							const currentAccounts = [
								(account = account)
							];
							if(account!==undefined){
							return res.status(200).send({ currentAccounts,message:true });
							}
							else{res.send({message:false})}
						})
						.catch(error => {
							return res.send({ message: false });
						});
				} // end of if statement
				else {
					return res.send({message: false});
				}
			});
	});
};

// Method to get all Credit Union Current Accounts
router.getAllCUcurrentAccounts = async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	let refreshToken = null;
	let name = 'Credit Union';
	FiRecord.findOne({ fiName: name }).then(user => {
		let id = user.id;
		FiDetails.findOne({ financialInstitutionID: id })
			.then(resp => {
				if (resp !== null){
					refreshToken = resp.refreshToken;}
			})
			.then(async resp => {
				if (refreshToken!==null){
					await axios
						.get(process.env.CREDIT_UNION_SERVER + '/api/account/find-current-all', {
							headers: {
								Authorization: refreshToken
							}
						})
						.then(response => {
							let account = response.data.account;
							const currentAccounts = [
								(account = account)
							];
							if(account!==undefined){
								return res.status(200).send({ currentAccounts,message:true });
								}
								else{res.send({message:false})}
						})
						.catch(error => {
							return res.send({ message: false });
						});
				} // end of if statement
				else {
					return res.send({message: false});
				}
			});
	});
};

// SAVINGS ACCOUNT METHODS

// Get all WIT Savings Accounts
router.getAllWITsavingsAccounts = async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	let refreshToken = null;
	let name = 'Bank of WIT';
	FiRecord.findOne({ fiName: name }).then(user => {
		let id = user.id;
		FiDetails.findOne({ financialInstitutionID: id })
			.then(resp => {
				if (resp !== null){
					refreshToken = resp.refreshToken;}
			})
			.then(async resp => {
				if (refreshToken!=null){
					await axios
						.get(process.env.WIT_BANK_SERVER + '/api/account/find-savings-all', {
							headers: {
								Authorization: refreshToken
							}
						})
						.then(response => {
							let account = response.data.account;
							const savingsAccounts = [
								(account = account)
							];
							if(account!==undefined){
								return res.status(200).send({ savingsAccounts,message:true });
								}
								else{res.send({message:false})}
						})
						.catch(error => {
							return res.send({ message: false });
						});
				} // end of if statement
				else {
					return res.send({message: false});
				}
			});
	});
};

// Get all AIB Savings Accounts
router.getAllAIBsavingsAccounts = async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	let refreshToken = null;
	let name = 'AIB';
	FiRecord.findOne({ fiName: name }).then(user => {
		let id = user.id;
		FiDetails.findOne({ financialInstitutionID: id })
			.then(resp => {
				if (resp !== null){
					refreshToken = resp.refreshToken;}
			})
			.then(async resp => {
				if (refreshToken!==null){
					await axios
						.get(process.env.AIB_BANK_SERVER + '/api/account/find-savings-all', {
							headers: {
								Authorization: refreshToken
							}
						})
						.then(response => {
							let account = response.data.account;
							const savingsAccounts = [
								(account = account)
							];
							if(account!==undefined){
								return res.status(200).send({ savingsAccounts,message:true });
								}
								else{res.send({message:false})}
						})
						.catch(error => {
							return res.send({ message: false });
						});
				} // end of if statement
				else {
					return res.send({message: false});
				}
			});
	});
};

// Get all Credit Union Savings Accounts
router.getAllCUsavingsAccounts = async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	let refreshToken = null;
	let name = 'Credit Union';
	FiRecord.findOne({ fiName: name }).then(user => {
		let id = user.id;
		FiDetails.findOne({ financialInstitutionID: id })
			.then(resp => {
				if (resp !== null){
					refreshToken = resp.refreshToken;}
			})
			.then(async resp => {
				if (refreshToken!==null){
					await axios
						.get(process.env.CREDIT_UNION_SERVER + '/api/account/find-savings-all', {
							headers: {
								Authorization: refreshToken
							}
						})
						.then(response => {
							let account = response.data.account;
							const savingsAccounts = [
								(account = account)
							];
							if(account!==undefined){
								return res.status(200).send({ savingsAccounts,message:true });
								}
								else{res.send({message:false})}
						})
						.catch(error => {
							return res.send({ message: false });
						});
				} // end of if statement
				else {
					return res.send({message: false});
				}
			});
	});
};

// Get all Post Office Savings Accounts
router.getAllPostSavingsAccounts = async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	let refreshToken = null;
	let name = 'Post Office';
	FiRecord.findOne({ fiName: name }).then(user => {
		let id = user.id;
		FiDetails.findOne({ financialInstitutionID: id })
			.then(resp => {
				if (resp !== null){
					refreshToken = resp.refreshToken;}
			})
			.then(async resp => {
				if (refreshToken!==null){
					await axios
						.get(process.env.AN_POST_SERVER + '/api/account/find-savings-all', {
							headers: {
								Authorization: refreshToken
							}
						})
						.then(response => {
							let account = response.data.account;
							const savingsAccounts = [
								(account = account)
							];
							if(account!==undefined){
								return res.status(200).send({ savingsAccounts,message:true });
								}
								else{res.send({message:false})}
						})
						.catch(error => {
							return res.send({ message: false });
						});
				} // end of if statement
				else {
					return res.send({message: false});
				}
			});
	});
};

module.exports = router;
