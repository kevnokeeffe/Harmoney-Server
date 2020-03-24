const jwt = require('jsonwebtoken')
let express = require('express')
let router = express.Router()
const axios = require('axios')
let User = require('../models/users-models/user-model')
const Account = require('../models/financial-institution/account')
require('dotenv').config()
let goodMessage = "Successfull Update"
let badMessage = "Unsuccessfull Update"

router.saveRefreshToken = async (tokenB, uID) => {
  const fiToken = decodeToken(tokenB)
  const fiID = getFiID(fiToken)
  const userFiID = getUserFiID(fiToken)
  const fiEmail = getEmail(fiToken)
  //Create Bank Account
  Account.findOne({financialInstitutionID:fiID}, (error, account) => {
    if (error || !account) {
      createAccount(tokenB, fiID,userFiID,fiEmail ,uID)
    }
    else{
      // Update account
      const updateAccount = account
    updateAccount.financialInstitutionID = fiID
    updateAccount.userFiID = userFiID //fk
    updateAccount.refreshToken = tokenB
    updateAccount.bankEmail = fiEmail
    Account.findByIdAndUpdate({_id: updateAccount._id}, updateAccount, error  =>{
    if(error){
      return badMessage
    }else{
    return goodMessage}
  })
    }
})
}

createAccount = (tokenB, fiID, userFiID, fiEmail ,uID) => {
  const account = new Account({
    userID: uID,
    email: null,
    financialInstitutionID: fiID, //fk
    refreshToken: tokenB,
    accessToken: null,
    IBAN: null,
    userFiID: userFiID,
    bankEmail: fiEmail,
  })
  account.save()
}

router.saveAccessToken = async (tokenA) => {
  const fiToken = decodeToken(tokenA)
  const fiID = getFiID(fiToken)
  Account.findOne({financialInstitutionID:fiID}, (error, account) => {
    if (error) {
      return res.status(500).json()
    }
    if (!account) {
      return res.status(404).json()
    }
    }).then(account => {
    const updateAccount = account
    updateAccount.accessToken = tokenA
    Account.findByIdAndUpdate({_id: updateAccount._id}, updateAccount, error  =>{
    if(error){
      return badMessage
    }else{
    return goodMessage}
  })
})
}

router.decodeHeaderToken = (req) => {
  let checkToken = req.header('authenticate')
  const decodeToken = jwt.decode(checkToken)
  return decodeToken
}

decodeHeaderTokenInt = (req) => {
  let checkToken = req.header('Authorization')
  const decodeToken = jwt.decode(checkToken)
  return decodeToken
}


getUserIDint = (decodeToken) => {
  let userID = decodeToken.id
  return userID
}

router.getUserID = (decodeToken) => {
        let userID = decodeToken.id
        return userID
}

findAccountByUserID = (uID) => {
  Account.findOne({ userID: uID},(error,account) => {
    if(error || !account) {
        return badMessage
      }
    return account
  })
}

// Get Refresh token Method
router.getRefreshToken = (req) => {
  token = decodeHeaderToken(req)
}

// Get Access token Method
router.getAccessToken = () => {
  
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
