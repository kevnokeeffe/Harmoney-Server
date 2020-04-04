const express = require('express');
const router = express.Router();
const controller = require('../controllers/transaction-controller/transaction-controller');
const auth = require('../middleware/authenticate');

router.post('/execute-internal', auth, controller.transactionBreakdown);

router.post('/execute-external', auth, (req, res) => {
	let obj = {
		message: true,
		secret: 'You may pass',
		_id: req._id
	};

	res.status(200).send(obj);
});

module.exports = router;