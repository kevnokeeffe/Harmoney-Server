let express = require('express')
let router = express.Router()
const axios = require('axios')
// import  User from '../db/models/user-model'
// import Account from '../db/models/financial-institution/account'
// import moment from 'moment'
// import auth from '../../services/auth-service'

router.getAllSavingsAccounts = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  await axios
    .get(process.env.WIT_BANK_SERVER + 'api/account/find-savings-all')
    .then(res => {
      return res.status(200).send({ account: account })
    })
    .catch(error => {
      return error
    })
}

router.getIndividualSavingsAccount = async (req, res) => {
  const savingsAccount = { id: req.body._id }
  res.setHeader('Content-Type', 'application/json')
  await axios
    .get(
      process.env.WIT_BANK_SERVER +
        `api/account/find-current-individual/${savingsAccount}`
    )
    .then(res => {
      return res.status(200).send({ account: account })
    })
    .catch(error => {
      return error
    })
}

router.getIndividualCurrentAccount = async (req, res) => {
  const currentAccount = { id: req.body._id }
  res.setHeader('Content-Type', 'application/json')
  await axios
    .get(
      process.env.WIT_BANK_SERVER +
        `api/account/find-current-individual/${currentAccount}`
    )
    .then(res => {
      return res.status(200).send({ account: account })
    })
    .catch(error => {
      return error
    })
}

router.updateCurrentAccount = async (req, res) => {
  const currentAccount = { id: req.body._id }
  res.setHeader('Content-Type', 'application/json')
  await axios
    .put(
      process.env.WIT_BANK_SERVER +
        `api/account/update-current-individual/${currentAccount}`
    )
    .then(res => {
      return res.status(200).send({ account: account })
    })
    .catch(error => {
      return error
    })
}

router.updateSavingsAccount = async (req, res) => {
  const savingsAccount = { id: req.body._id }
  res.setHeader('Content-Type', 'application/json')
  await axios
    .put(
      process.env.WIT_BANK_SERVER +
        `api/account/update-current-individual/${savingsAccount}`
    )
    .then(res => {
      return res.status(200).send({ account: account })
    })
    .catch(error => {
      return error
    })
}

// CURRENT ACCOUNT GET METHODS

// Get all WIT Current Accounts - Working
router.getAllWITcurrentAccounts = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  await axios
    .get(process.env.WIT_BANK_SERVER + 'api/account/find-current-all', {
      headers: {
        // Authorization: 'Bearer ' + token //the token is a variable which holds the token
      }
    })
    .then(response => {
      let accountWIT = response.data.account
      return res.status(200).send(accountWIT)
    })
    .catch(error => {
      return res.status(402).json({ message: 'Invalid!' })
    })
}

// Method to get all AIB Current Accounts
router.getAllAIBcurrentAccounts = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  await axios
    .get(process.env.AIB_BANK_SERVER + 'api/account/find-current-all', {
      headers: {
        // Authorization: 'Bearer ' + token //the token is a variable which holds the token
      }
    })
    .then(response => {
      let accountAIB = response.data.account
      return res.status(200).send(accountAIB)
    })
    .catch(error => {
      return res.status(402).json({ message: 'Invalid!' })
    })
}

// Method to get all An Post Current Accounts
router.getAllPostCurrentAccounts = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  await axios
    .get(process.env.AN_POST_SERVER + 'api/account/find-current-all', {
      headers: {
        // Authorization: 'Bearer ' + token //the token is a variable which holds the token
      }
    })
    .then(response => {
      let accountPost = response.data.account
      return res.status(200).send(accountPost)
    })
    .catch(error => {
      return res.status(402).json({ message: 'Invalid!' })
    })
}

// Method to get all Credit Union Current Accounts
router.getAllCUcurrentAccounts = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  await axios
    .get(process.env.CREDIT_UNION_SERVER + 'api/account/find-current-all', {
      headers: {
        // Authorization: 'Bearer ' + token //the token is a variable which holds the token
      }
    })
    .then(response => {
      let accountCU = response.data.account
      return res.status(200).send(accountCU)
    })
    .catch(error => {
      return res.status(402).json({ message: 'Invalid!' })
    })
}

// Get all current accounts method.
router.getAllCurrent = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const requestCU = axios.get(
    process.env.CREDIT_UNION_SERVER + 'api/account/find-current-all'
  )
  const requestPost = axios.get(
    process.env.AN_POST_SERVER + 'api/account/find-current-all'
  )
  const requestWIT = axios.get(
    process.env.WIT_BANK_SERVER + 'api/account/find-current-all'
  )
  const requestAIB = axios.get(
    process.env.AIB_BANK_SERVER + 'api/account/find-current-all'
  )
  await axios
    .all([requestCU, requestPost, requestWIT, requestAIB])
    .then(
      await axios.spread((requestCU, requestPost, requestWIT, requestAIB) => {
        const currentAccounts = [
          creditUnion = requestCU.data.account[0],
          AnPost = requestPost.data.account[0],
          BOW = requestWIT.data.account[0],
          AIB = requestAIB.data.account[0]
        ]
        return res.status(200).send({currentAccounts})
      })
    )
    .catch(error => {
      return res.status(402).json({ message: 'Invalid!' })
    })
}


// Method used for testing - get local current accounts
router.getLocalcurrentAccounts = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  await axios
    .get(process.env.BANK_SERVER + 'api/account/find-current-all', {
      headers: {
        // Authorization: 'Bearer ' + token //the token is a variable which holds the token
      }
    })
    .then(response => {
      let accountLocal = response.data.account
      return res.status(200).send(accountLocal)
    })
    .catch(error => {
      return res.status(402).json({ message: 'Invalid!' })
    })
}

// Get all savings accounts method.
router.getAllSavings = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const requestCU = axios.get(
    process.env.CREDIT_UNION_SERVER + 'api/account/find-savings-all'
  )
  const requestPost = axios.get(
    process.env.AN_POST_SERVER + 'api/account/find-savings-all'
  )
  const requestWIT = axios.get(
    process.env.WIT_BANK_SERVER + 'api/account/find-savings-all'
  )
  const requestAIB = axios.get(
    process.env.AIB_BANK_SERVER + 'api/account/find-savings-all'
  )
  await axios
    .all([requestCU, requestPost, requestWIT, requestAIB])
    .then(
      await axios.spread((requestCU, requestPost, requestWIT, requestAIB) => {
        const savingsAccounts = [
          creditUnion = requestCU.data.account[0],
          AnPost = requestPost.data.account[0],
          BOW = requestWIT.data.account[0],
          AIB = requestAIB.data.account[0]
        ]
        return res.status(200).send({savingsAccounts})
      })
    )
    .catch(error => {
      return res.status(402).json({ message: 'Invalid!' })
    })
}

module.exports = router
