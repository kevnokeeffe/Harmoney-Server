let express = require('express')
let router = express.Router()
let User = require('../../models/users-models/user-model')
const bcrypt = require('bcryptjs')
let auth = require('../../services/auth-service')
const Account = require('../../models/financial-institution/account')
// Register Method
router.register = (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  // checks to see if the email already exists
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        //409 means conflict could use 422 which means unprocessable entity
        return res.status(409).json({ message: 'Sorry, email already exists!' })
      } else {
        //console.log(user)
        const user = new User({
          fName: req.body.fName,
          lName: req.body.lName,
          email: req.body.email,
          password: req.body.password
        })
        user
          .save()
          .then(user => {
            createAccount(user)
            const token = auth.generateJWT(user)
            res
              .status(200)
              .send({ auth: true, token: token, message: 'User Created' })
          })
          .catch(err => {
            res
              .status(500)
              .json({ message: 'Error Invalid Inputs', error: err })
          })
      }
    })
}

createAccount = user => {
  captureDetailsReg(user)
  const userEmail = user.email
  const id = user._id
  const account = new Account({
    userID: id,
    email: userEmail,
    bank:[{
      financialInstitutionID: null, //fk
      refreshToken: null,
      accessToken: null,
      IBAN: null,
      userFiID: null,
      bankEmail: null,
  }],

  })
  account.save()
}

captureDetailsReg = user => {
  const userEmail = user.email
  const id = user._id
  console.log(userEmail)
  console.log(id)
}

captureDetailsLogin = userEmail => {
  console.log(userEmail)
  User.findOne({ email: userEmail })
    .exec()
    .then(user => {
      const id = user._id
      console.log(id)
    })
}

// Login Method
router.login = (req, res) => {
  captureDetailsLogin(req.body.email)
  res.setHeader('Content-Type', 'application/json')
  const { email } = req.body
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).send(err, { message: 'User not found' })
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then(match => {
          if (!match) {
            return res.status(401).send({ auth: false, token: null })
          }
          const token = auth.generateJWT(user)
          return res
            .status(200)
            .send({ auth: true, message: 'Login Successful', token: token })
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
}

module.exports = router
