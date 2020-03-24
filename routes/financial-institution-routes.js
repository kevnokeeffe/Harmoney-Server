const express = require('express')
const router = express.Router()
const fiController = require('../controllers/financial-institution-controllers/financial-institution-controller')
const auth = require('../middleware/authenticate')

// Login Route for access token.
router.post('/login-access-local', auth.verifyToken, fiController.loginAccess)
router.post('/login-access-wit', auth.verifyToken, fiController.loginAccessWIT)
router.post('/login-access-aib', auth.verifyToken, fiController.loginAccessAIB)
router.post('/login-access-credit-union', auth.verifyToken, fiController.loginAccessCU)
router.post('/login-access-post', auth.verifyToken, fiController.loginAccessPost)

// Login Route for refresh token.
router.post('/login-refresh-local', auth.verifyToken, fiController.loginRefresh)
router.post('/login-refresh-wit', auth.verifyToken, fiController.loginRefreshWIT)
router.post('/login-refresh-aib', auth.verifyToken, fiController.loginRefreshAIB)
router.post('/login-refresh-credit-union', auth.verifyToken, fiController.loginRefreshCU)
router.post('/login-refresh-post', auth.verifyToken, fiController.loginRefreshPost)

// Get all fi details and add them to the database.
router.get('/get-fi-details',fiController.getAllFIDetails)

module.exports = router