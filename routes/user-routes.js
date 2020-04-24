const express = require('express');
const router = express.Router();
require('dotenv').config();
const authyUserController = require('../controllers/user-controllers/user-authy-controller');
const auth = require('../middleware/authenticate');

// Authy Register Route 
router.post('/authy-register', authyUserController.registerAuthy);
// Authy send validation message to mobile route
router.post('/authy-validate', authyUserController.validate);
// Authy login route
router.post('/authy-login', authyUserController.authyLogin);
// Authy validate code route
router.post('/authy-validate-code-signup', authyUserController.validateCode);
// Send validation code for login
router.post('/authy-validate-code-login', authyUserController.validateCodeLogin);
// Check signup email
router.post('/authy-check-signup-email', authyUserController.authyUserCheckSignUpEmail);
// Check signup email
router.post('/authy-check-signup-phone', authyUserController.authyUserCheckSignUpPhone);
// Check if user email exists
router.post('/authy-user-email', authyUserController.authyUserEmail);
// Update email
router.post('/authy-change-user-email', authyUserController.authyUserEmailUpdate);
// Change user phone
router.post('/authy-change-user-phone', authyUserController.authyUserPhoneUpdate);
// Delete user by id
router.delete('/authy-delete/:id', auth.verifyToken, authyUserController.deleteUser);

// Check if the token is valid or not
router.get('/valid-token', auth.verifyToken, (req, res) => {
	let obj = {
		message: true,
		auth:true,
	};
	res.status(200).send(obj);
});

module.exports = router;
