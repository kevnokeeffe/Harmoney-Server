const express = require('express');
const router = express.Router();
const controller = require('../controllers/transaction-controller/transaction-controller');
const auth = require('../middleware/authenticate');

router.post('/execute-internal', auth, controller.transactionBreakdown);

router.post('/execute-external',async (req, res) => {

	let info = req.body
	let obj = {
		message: true,
		secret: 'Testing',
		auth:true,
		data: info
	};
	res.status(200).send(obj);
});

router.get('/transaction-current-wit', auth, controller.transactionCurrentWIT)
router.get('/transaction-savings-wit', auth, controller.transactionSaveingsWIT)
router.get('/transaction-current-aib', auth, controller.transactionCurrentAIB)
router.get('/transaction-savings-aib', auth, controller.transactionSaveingsAIB)
router.get('/transaction-current-cu', auth, controller.transactionCurrentCU)
router.get('/transaction-savings-cu', auth, controller.transactionSaveingsCU)
router.get('/transaction-current-post', auth, controller.transactionCurrentPost)
router.get('/transaction-savings-post', auth, controller.transactionSaveingsPost)

module.exports = router;