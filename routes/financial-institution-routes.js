const express = require('express')
const router = express.Router()
const FIcontoller = require('../controllers/financial-institution-controllers/financial-institution-controller')

// Login Route
router.post('/login', FIcontoller.login)

module.exports = router