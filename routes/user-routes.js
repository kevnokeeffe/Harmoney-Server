const express = require('express')
const router = express.Router()
require('dotenv').config()
const userController = require('../controllers/user-controllers/user-control')
const auth = require('../services/auth-service')
// Register Route
router.post('/register', userController.register);
// Login Route
router.post('/login', userController.login);
// Hello World Test
router.get('/user', (req, res) => {
  return res.json({ message: 'Hello World' })
})
router.get('/bank', auth.helloBank);

module.exports = router
