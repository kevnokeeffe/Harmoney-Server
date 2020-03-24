let express = require('express')
let router = express.Router()
const FiRecord = require('../models/financial-institution/financial-institution-details')
const FiDetails = require('../models/financial-institution/account')

router.getPostRefreshToken = async (req,res) => {
  const fiName = req
  await FiRecord.findOne({ fiName }).then(async user => {
    let id = user.id
    await FiDetails.findOne({ financialInstitutionID: id }).then(async resp => {
      let token = resp.refreshToken
      return token
    })
  })
}

router.getAibRefreshToken = (req, res) => {
  const fiName = 'AIB'
  FiRecord.findOne({ fiName }).then(user => {
    let id = user.id
    console.log(id)
    FiDdetails.findOne({ financialInstitutionID: id }).then(resp => {
        console.log(resp.refreshToken)
        let token = resp.refreshToken
        return res.send(token)
    })
  })
}

router.getWitRefreshToken = (req, res) => {
  const fiName = 'Bank of WIT'
  FiRecord.findOne({ fiName }).then(user => {
    let id = user.id
    FiDetails.findOne({ financialInstitutionID: id }).then(resp => {
        console.log(resp.refreshToken)
        let token = resp.refreshToken
        return res.send(token)
    })
  })
}

router.getCuRefreshToken = (req, res) => {
  const fiName = 'Credit Union'
  FiRecord.findOne({ fiName }).then(user => {
    let id = user.id
    FiDetails.findOne({ financialInstitutionID: id }).then(resp => {
        console.log(resp.refreshToken)
        let token = resp.refreshToken
        return res.send(token)
    })
  })
}

module.exports = router
