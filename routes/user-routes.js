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

router.post('/authy-validate', authyUserController.validate)

router.post('/authy-login', authyUserController.validate)

router.post('/authy-validate-code', authyUserController.validateCode)
// router.post('/authy-test',authyUserController.test)
module.exports = router
