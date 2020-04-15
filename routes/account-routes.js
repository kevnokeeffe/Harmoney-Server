const express = require('express');
const router = express.Router();
const controller = require('../controllers/accounts-controller/accounts-controller');
const auth = require('../middleware/authenticate');

// CURRENT ACCOUNTS
// Individual current account calls.
router.get('/current-all-wit', auth.verifyToken,  controller.getAllWITcurrentAccounts);
router.get('/current-all-aib', auth.verifyToken, controller.getAllAIBcurrentAccounts);
router.get('/current-all-cu', auth.verifyToken, controller.getAllCUcurrentAccounts);
router.get('/current-all-post', auth.verifyToken, controller.getAllPostCurrentAccounts);

// SAVINGS ACCOUNTS
// Individual savings account calls.
router.get('/saving-all-wit', auth.verifyToken,  controller.getAllWITsavingsAccounts);
router.get('/saving-all-aib', auth.verifyToken, controller.getAllAIBsavingsAccounts);
router.get('/saving-all-cu', auth.verifyToken, controller.getAllCUsavingsAccounts);
router.get('/saving-all-post', auth.verifyToken, controller.getAllPostSavingsAccounts);

//DELETE ACCOUNT DATA
router.delete('/delete/fi-details/:id', auth.verifyToken, controller.deleteFiDetails);
module.exports = router;
