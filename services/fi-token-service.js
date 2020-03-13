const jwt = require('jsonwebtoken')
let express = require('express')
let router = express.Router()
const axios = require('axios')
let User = require('../models/users-models/user-model')
const Account = require('../models/financial-institution/account')
require('dotenv').config()

router.saveRefreshToken = async (token, uID) => {
  const dToken = decodeToken(token)
  const fiID = getFiID(dToken)
  const userFiID = getUserFiID(dToken)
  const tEmail = getEmail(dToken)
  console.log(account)
//   const account = Account({ bank:[{financialInstitutionID: fiID, //fk
//     userFiID: userFiID, //fk
//     refreshToken: token,
//     bankEmail: tEmail}]
//   })
//   Account.findByIdAndUpdate({userID: uID}, account, error =>{
//   })
}

router.decodeHeaderToken = (req) => {
  let checkToken = req.header('Authorization')
  const decodeToken = jwt.decode(checkToken)
  return decodeToken
}

router.getUserID = (decodeToken) => {
        let userID = decodeToken.id
        return userID
}

findAccountByUserID = (uID) => {
    //console.log(uID)
  Account.findOne({ userID: uID},(error,account) => {
    if(error || !account) {
        console.log("error")
      }
      //console.log(account)
    return account
  })
}

router.saveAccessToken = token => {
  console.log(token)
}

decodeToken = token => {
  if (!token) {
    return null
  }
  return jwt.decode(token)
}

getFiID = dToken => {
  if (!dToken) {
    return null
  }
  try {
    return dToken.financialInstitutionID
  } catch (error) {
    return null
  }
}

getEmail = dToken => {
  if (!dToken) {
    return null
  }
  try {
    return dToken.email
  } catch (error) {
    return null
  }
}

getUserFiID = dToken => {
  if (!dToken) {
    return null
  }
  try {
    return dToken.id
  } catch (error) {
    return null
  }
}

module.exports = router
