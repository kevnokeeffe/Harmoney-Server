const express = require('express');
const router = express.Router();
const controller = require('../controllers/transaction-controller/transaction-controller');
const auth = require('../middleware/authenticate');

router.post('/execute-internal', auth, controller.transactionBreakdown);

router.post('/execute-external', (req, res) => {
	let info = req.body
	let obj = {
		message: true,
		secret: 'Testing',
		auth:true,
		data: info
	};
	res.status(200).send(obj);
});

module.exports = router;