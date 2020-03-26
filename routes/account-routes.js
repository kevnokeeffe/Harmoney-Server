const express = require('express');
const router = express.Router();
const controller = require('../controllers/accounts-controller/accounts-controller');
const auth = require('../middleware/authenticate');

/* GET accounts listing. */
// router.post('/account', controller.create)

// CURRENT ACCOUNTS
// From local server
router.get('/current-all-local',  controller.getLocalcurrentAccounts);
// Get all current accounts in one call.
router.get('/current-all', auth.verifyToken,  controller.getLocalcurrentAccounts);
// Individual current account calls.
router.get('/current-all-wit', auth.verifyToken,  controller.getAllWITcurrentAccounts);
router.get('/current-all-aib', auth.verifyToken, controller.getAllAIBcurrentAccounts);
router.get('/current-all-cu', auth.verifyToken, controller.getAllCUcurrentAccounts);
router.get('/current-all-post', auth.verifyToken, controller.getAllPostCurrentAccounts);

// Savings Accounts
router.get('/savings-all', auth.verifyToken, controller.getAllSavings);

router.get('/current-individual/:id', auth.verifyToken, controller.getIndividualCurrentAccount);
router.get('/savings-individual/:id', controller.getIndividualSavingsAccount);
router.put('/current-individual-update/:id', auth.verifyToken, controller.updateCurrentAccount);
router.put('/savings-individual-update/:id', auth.verifyToken, controller.updateSavingsAccount);
// router.delete('/account/delete', controller.remove)

module.exports = router;
