const express = require('express')
const router = express.Router()
const fiController = require('../controllers/financial-institution-controllers/financial-institution-controller')

// Login Route
router.post('/login-access', fiController.loginAccess)
router.post('/login-refresh', fiController.loginRefresh)

module.exports = router