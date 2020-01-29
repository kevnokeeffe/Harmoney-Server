const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../db/models/user-model')
// const jwt = require('jsonwebtoken')
let auth = require('../services/auth-service')

require('dotenv').config()

// Register User
router.post('/register', (req, res) => {
  const { email, password, fName, lName, username } = req.body

  let newUser = new User({
    email,
    password,
    fName,
    lName,
    username
  })

  newUser
    .save()
    .then(user => {
      if (!user) {
        return res.status(400).send()
      }
      return res.status(201).send(user)
    })
    .catch(err => {
      if (err) {
        return res.status(400).send({ error: err })
      }
      return res.status(400).send()
    })
})

// User Login
router.post('/login', (req, res) => {
  const { email } = req.body
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).send(err, {message: 'User not found'})
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then(match => {
          if (!match) {
            return res.status(401).send({auth:false, token: null})
          }
          // const tokenData = {fName:user.fName, id: user._id, email: user.email};
          // const token = jwt.sign( tokenData , process.env.SECRET_KEY, {
          //   expiresIn: 8000
          // } )
          const token = auth.generateJWT(user)
          return res.status(200).send({ message: 'Login Successful', token: token })
        })
        .catch(err => {
          // where the error is
          return res.status(409).send({ error: err })
        })
    })
    .catch(err => {
      if (err) {
        return res.status(401).send(err)
      }
      return res.status(401).send(err)
    })
})

module.exports = router
