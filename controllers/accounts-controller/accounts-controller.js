let express = require('express')
let router = express.Router()
const axios = require('axios')
// import  User from '../db/models/user-model'
// import Account from '../db/models/financial-institution/account'
// import moment from 'moment'
// import auth from '../../services/auth-service'
let account = null

// Get all Current Accounts - Working
router.getAllCurrentAccounts = async (req,res) => {
    res.setHeader('Content-Type', 'application/json')
    await axios
      .get(process.env.WIT_BANK_SERVER + '/api/account/find-current-all')
      .then( response => {
          account = response.data.account
          return res.status(200).send(account)
      })
      .catch(error => {
        return res.status(402).json({ message: 'Invalid!' })
      })
  }

  router.getAllSavingsAccounts = async (req,res) => {
    res.setHeader('Content-Type', 'application/json')
    await axios
      .get(process.env.WIT_BANK_SERVER + '/api/account/find-savings-all')
      .then(res => {
         return res
        .status(200)
        .send({ account:account })
      })
      .catch(error => {
        return error
      })
  }

  router.getIndividualSavingsAccount = async (req,res) => {
    const savingsAccount = { id : req.body._id}
    res.setHeader('Content-Type', 'application/json')
    await axios
      .get(process.env.WIT_BANK_SERVER + `/api/account/find-current-individual/${savingsAccount}`)
      .then(res => {
         return res
        .status(200)
        .send({ account:account })
      })
      .catch(error => {
        return error
      })
  }

  router.getIndividualCurrentAccount = async (req,res) => {
    const currentAccount = { id : req.body._id}
    res.setHeader('Content-Type', 'application/json')
    await axios
      .get(process.env.WIT_BANK_SERVER + `/api/account/find-current-individual/${currentAccount}`)
      .then(res => {
         return res
        .status(200)
        .send({ account:account })
      })
      .catch(error => {
        return error
      })
  }

  router.updateCurrentAccount = async (req,res) => {
    const currentAccount = { id : req.body._id}
    res.setHeader('Content-Type', 'application/json')
    await axios
      .put(process.env.WIT_BANK_SERVER + `/api/account/update-current-individual/${currentAccount}`)
      .then(res => {
         return res
        .status(200)
        .send({ account:account })
      })
      .catch(error => {
        return error
      })
  }

  router.updateSavingsAccount = async (req,res) => {
    const savingsAccount = { id : req.body._id}
    res.setHeader('Content-Type', 'application/json')
    await axios
      .put(process.env.WIT_BANK_SERVER + `/api/account/update-current-individual/${savingsAccount}`)
      .then(res => {
         return res
        .status(200)
        .send({ account:account })
      })
      .catch(error => {
        return error
      })
  }

  module.exports = router