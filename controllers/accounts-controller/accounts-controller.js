/* eslint-disable no-unused-vars */
/* eslint-disable no-self-assign */
/* eslint-disable no-undef */
let express = require('express');
let router = express.Router();
const axios = require('axios');
const FiRecord = require('../../models/financial-institution/financial-institution-details');
const FiDetails = require('../../models/financial-institution/account');

router.getAllSavingsAccounts = async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	await axios
		.get(process.env.WIT_BANK_SERVER + 'api/account/find-savings-all')
		.then(res => {
			return res.status(200).send({ account: account });
		})
		.catch(error => {
			return error;
		});
};

router.getIndividualSavingsAccount = async (req, res) => {
	const savingsAccount = { id: req.body._id };
	res.setHeader('Content-Type', 'application/json');
	await axios
		.get(
			process.env.WIT_BANK_SERVER +
        `api/account/find-current-individual/${savingsAccount}`
		)
		.then(res => {
			return res.status(200).send({ account: account });
		})
		.catch(error => {
			return error;
		});
};

router.getIndividualCurrentAccount = async (req, res) => {
	const currentAccount = { id: req.body._id };
	res.setHeader('Content-Type', 'application/json');
	await axios
		.get(
			process.env.WIT_BANK_SERVER +
        `api/account/find-current-individual/${currentAccount}`
		)
		.then(res => {
			return res.status(200).send({ account: account });
		})
		.catch(error => {
			return error;
		});
};

router.updateCurrentAccount = async (req, res) => {
	const currentAccount = { id: req.body._id };
	res.setHeader('Content-Type', 'application/json');
	await axios
		.put(
			process.env.WIT_BANK_SERVER +
        `api/account/update-current-individual/${currentAccount}`
		)
		.then(res => {
			return res.status(200).send({ account: account });
		})
		.catch(error => {
			return error;
		});
};

router.updateSavingsAccount = async (req, res) => {
	const savingsAccount = { id: req.body._id };
	res.setHeader('Content-Type', 'application/json');
	await axios
		.put(
			process.env.WIT_BANK_SERVER +
        `api/account/update-current-individual/${savingsAccount}`
		)
		.then(res => {
			return res.status(200).send({ account: account });
		})
		.catch(error => {
			return error;
		});
};

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
								console.log(currentAccounts)
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
								console.log(currentAccounts)
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

// Method used for testing - get local current accounts
router.getLocalcurrentAccounts = async (req, res) => {
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
								console.log(currentAccounts)
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
								console.log(savingsAccounts)
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

// Old Get all savings accounts method.
router.getAllSavings = async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	const requestCU = axios.get(
		process.env.CREDIT_UNION_SERVER + 'api/account/find-savings-all',
		{
			headers: {
				Authorization: token
			}
		}
	);
	const requestPost = axios.get(
		process.env.AN_POST_SERVER + 'api/account/find-savings-all'
	);
	const requestWIT = axios.get(
		process.env.WIT_BANK_SERVER + 'api/account/find-savings-all'
	);
	const requestAIB = axios.get(
		process.env.AIB_BANK_SERVER + 'api/account/find-savings-all'
	);
	await axios
		.all([requestCU, requestPost, requestWIT, requestAIB])
		.then(
			await axios.spread((requestCU, requestPost, requestWIT, requestAIB) => {
				const savingsAccounts = [
					(creditUnion = requestCU.data.account[0]),
					(AnPost = requestPost.data.account[0]),
					(BOW = requestWIT.data.account[0]),
					(AIB = requestAIB.data.account[0])
				];
				return res.status(200).send({ savingsAccounts });
			})
		)
		.catch(error => {
			return res.status(402).json({ message: 'Invalid!' });
		});
};

module.exports = router;
