let express = require('express')
let router = express.Router()
const axios = require('axios')

router.login = async (req,res) => {
    const user = { email : req.body.email, password : req.body.password}
    res.setHeader('Content-Type', 'application/json')
    await axios
      .post(process.env.WIT_BANK_SERVER + '/api/user/login-access', user)
      .then(res => {
        const token = res.data.token
        console.log(token)
      })
      .catch(error => {
        console.log(error)
      })
  }

  // Server to server connection test
router.helloBank = async (req,res) => {
    res.setHeader('Content-Type', 'application/json')
    await axios
      .get(process.env.WIT_BANK_SERVER + '/api/test/bank')
      .then(res => {
        console.log(res.data.message)
        return res.json(res.data.message)
      })
      .catch(error => {
        console.log(error)
      })
  }

  module.exports = router