const User = require('../../models/users-models/user')
let express = require('express')
let router = express.Router()
const twilio = require('twilio')
let auth = require('../../services/auth-service')
let code = ''

// Login Method
router.authyLogin = (req, res) => {
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

// Register Method
router.registerAuthy = (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  // checks to see if the email already exists
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        //409 means conflict could use 422 which means unprocessable entity
        return res.send({ message: false })
      } else {
        const user = new User({
          fName: req.body.fName,
          lName: req.body.lName,
          email: req.body.email,
          phone: req.body.phone,
          password: req.body.password
        })
        user
          .save()
          .then(user => {
            const token = auth.generateJWT(user)
            res.status(200).send({ auth: true, token: token, message: true })
          })
          .catch(err => {
            res
              .status(500)
              .json({ message: 'Error Invalid Inputs', error: err })
          })
      }
    })
}

router.signUp = async (req, res) => {
  let verCode = await this.authy(req)
}

// Method to generate a random code
randomCode = () => {
  let chars = 'acdefhiklmnoqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(
    ''
  )
  let count = 10
  let result = ''
  for (let i = 0; i < count; i++) {
    let x = Math.floor(Math.random() * chars.length)
    result += chars[x]
  }
  return result
}

// Method to send random code via text message
router.validate = (req, res) => {
  let accountSid = process.env.TWILIO_ACCOUNT_SID // The Account SID from Twilio
  let authToken = process.env.TWILIO_AUTH_TOKEN // The Auth Token from Twilio
  let client = new twilio(accountSid, authToken)
  code = randomCode()
  client.messages
    .create({
      body: code, // Generated random code
      to: req.body.phone, // Text this number
      from: process.env.TWILIO_PHONE_NUMBER // From a valid Twilio number
    })
    .then(() => {
      return res.status(200).send({ auth: true, message: true })
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Invalid Inputs', error: err })
    })
}

router.validateCode = (req, res) => {
  if (req.body.vCode === code) {
    return res.status(200).send({ message: true })
  } else {
    return res.send({ message: false })
  }
}

module.exports = router
