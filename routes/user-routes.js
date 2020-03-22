const express = require('express')
const router = express.Router()
require('dotenv').config()
const userController = require('../controllers/user-controllers/user-control')
const auth = require('../services/auth-service')
const authyUserController = require('../controllers/user-controllers/user-authy-controller')

// Register Route
router.post('/register', userController.register)
// Login Route
router.post('/login', userController.login)

// Authy Register Route 
router.post('/authy-register', authyUserController.registerAuthy)
// Authy send validation message to mobile route
router.post('/authy-validate', authyUserController.validate)
// Authy login route
router.post('/authy-login', authyUserController.authyLogin)
// Authy validate code route
router.post('/authy-validate-code-signup', authyUserController.validateCode)

router.post('/authy-validate-code-login', authyUserController.validateCodeLogin)
// Authy logout route
router.post('/authy-logout', authyUserController.authyLogout)

router.post('/authy-check-signup-email', authyUserController.authyUserCheckSignUpEmail)

router.post('/authy-user-email', authyUserController.authyUserEmail)
module.exports = router
