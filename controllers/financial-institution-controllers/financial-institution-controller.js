let express = require('express')
let router = express.Router()
const axios = require('axios')
const jwt = require('jsonwebtoken')
let token = null
// Get access token
router.loginAccess = async (req,res) => {
    const user = { email : req.body.email, password : req.body.password}
    res.setHeader('Content-Type', 'application/json')
    await axios
      .post(`${process.env.BANK_SERVER}/api/user/login-access`, user)
      .then(response => {
        token = response.data.token
        console.log(token)
        return res.status(200).send({token:token})
      })
      .catch(error => {
        console.log(error)
      })
  }

  // Get refresh token
  router.loginRefresh = async (req,res) => {
    const user = { email : req.body.email, password : req.body.password}
    res.setHeader('Content-Type', 'application/json')
    await axios
      .post(`${process.env.BANK_SERVER}/api/user/login-refresh`, user)
      .then(response => {
        token = response.data.token
        console.log(token)
        return res.status(200).send(token)
      })
      .catch(error => {
        console.log(error)
      })
  }

  router.decodeToken = (token) => {
    if (token.length <= 1) {
      return null;
    }
    return jwt.decode(token);
  }

  router.getToken = (token) =>{
    if(token.lenght <= 1) {
      return null;
    }
    return token
  }

  router.getFIname = () => {
    const data = decodeToken();
    if (!data) {
      return null;
    }
    try {
      return data.fiName;
    } catch (error) {
      return null;
    }
  }

  // Server to server connection test
router.helloBank = async (req,res) => {
    res.setHeader('Content-Type', 'application/json')
    await axios
      .get(`${process.env.BANK_SERVER}/api/test/bank`)
      .then(res => {
        console.log(res.data.message)
        return res.status(200).send(res.data.message)
      })
      .catch(error => {
        return res.status(409).json({ message: 'Invalid!' })
      })
  }

  module.exports = router