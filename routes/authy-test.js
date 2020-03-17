const express = require('express')
const router = express.Router()
const controller = require('../controllers/accounts-controller/accounts-controller')
const auth = require('../middleware/authenticate')
const authy = require('../controllers/user-controllers/user-authy-controller')

//router.post('/verify', authy.verify)


module.exports = router