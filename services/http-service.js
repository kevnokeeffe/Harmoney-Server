import axios from "axios"
let express = require('express')
let router = express.Router()
var http = require('http');
require('dotenv').config()
export function http() {
    return axios.create({
        baseURL: process.env.BANK_SERVER
    })
}

module.exports = router