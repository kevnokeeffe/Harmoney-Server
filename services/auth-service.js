const jwt = require('jsonwebtoken')
let express = require('express')
let router = express.Router()
const axios = require('axios')
require('dotenv').config()

router.generateJWT = user => {
  const tokenData = {
    fName: user.fName,
    lName: user.lName,
    id: user._id,
    email: user.email
  }
  return (token = jwt.sign(tokenData, process.env.SECRET_KEY, {
    expiresIn: 8000
  }))
}

// Server to server connection test
router.helloBank = () => {
  axios
    .get(process.env.WIT_BANK_SERVER + '/users/bank')
    .then(res => {
      console.log(res.data.message)
      //return res.json(res.data.message)
      return res
    })
    .catch(error => {
      console.log(error)
    })
}

module.exports = router
