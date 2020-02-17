import axios from 'axios'
let express = require('express')
let router = express.Router()
import auth from '../controllers/financial-institution-controllers/financial-institution-controller'

var http = require('http')
require('dotenv').config()
export function http() {
  return axios.create({
    baseURL: process.env.BANK_SERVER,
    headers: {
      authenticate: auth.getToken()
    }
  })
}

module.exports = router
