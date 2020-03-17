const express = require('express')
const router = express.Router()
const fiController = require('../controllers/financial-institution-controllers/financial-institution-controller')
const auth = require('../middleware/authenticate')

// Login Route
router.post('/login-access-wit', auth.verifyToken, fiController.loginAccess)
router.post('/login-access-aib', auth.verifyToken, fiController.loginAccess)
router.post('/login-access-credit-union', auth.verifyToken, fiController.loginAccess)
router.post('/login-access-post', auth.verifyToken, fiController.loginAccess)

router.post('/login-refresh-wit', auth.verifyToken, fiController.loginRefresh)
router.post('/login-refresh-aib', auth.verifyToken, fiController.loginRefresh)
router.post('/login-refresh-credit-union', auth.verifyToken, fiController.loginRefresh)
router.post('/login-refresh-post', auth.verifyToken, fiController.loginRefresh)
module.exports = router