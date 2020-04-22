let express = require('express')
let router = express.Router()
const axios = require('axios')
const FiRecord = require('../../models/financial-institution/financial-institution-details')
const FiDetails = require('../../models/financial-institution/account')
let refreshTokenPost = null
let refreshTokenBOW = null
let refreshTokenCU = null
let refreshTokenAIB = null

// This method does all the transcation heavy work. 
// Finds the financial instutition the transaction is associated with, 
// adds the correct token and sends off the data.

router.transactionBreakdown = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const id = req.body.transaction[1]
  console.log(req.body.transaction)
  await FiRecord.findOne({ fiName: process.env.POST }).then((record) => {
    let idx = record.id
    FiDetails.findOne({ financialInstitutionID: idx }).then((resp) => {
      if (resp != null) {
        refreshTokenPost = resp.refreshToken
      } else {
        refreshTokenPost = null
      }
    })
  })
  await FiRecord.findOne({ fiName: process.env.BANK_OF_WIT }).then((record) => {
    let idx = record.id
    FiDetails.findOne({ financialInstitutionID: idx }).then(async (resp) => {
      if (resp != null) {
        refreshTokenBOW = resp.refreshToken
      } else {
        refreshTokenBOW = null
      }
    })
  })
  await FiRecord.findOne({ fiName: process.env.AIB }).then((record) => {
    let idx = record.id
    FiDetails.findOne({ financialInstitutionID: idx }).then((resp) => {
      if (resp != null) {
        refreshTokenAIB = resp.refreshToken
      } else {
        refreshTokenAIB = null
      }
    })
  })
  await FiRecord.findOne({ fiName: process.env.CREDIT_UNION }).then(
    (record) => {
      let idx = record.id
      FiDetails.findOne({ financialInstitutionID: idx }).then((resp) => {
        if (resp != null) {
          refreshTokenCU = resp.refreshToken
        } else {
          refreshTokenCU = null
        }
      })
    }
  )

  // AN POST CALLS
  await axios
    .get(
      process.env.AN_POST_SERVER +
        '/api/account/find-current-individual/' +
        id,
      {
        headers: {
          Authorization: refreshTokenPost,
        },
      }
    )
    .then((resp) => {
      if (resp.data.message === true) {
        let data = req.body.transaction
        axios
          .post(
            process.env.AN_POST_SERVER +
              '/api/account/update-current-account-with/' +
              id,
            data,
            { headers: { Authorization: refreshTokenPost } }
          )
          .then((reply) => {
            if (reply.data.message === true) {
              return res.status(200).send({ message: true })
            }
          })
          .catch((error) => {
            return res.send({ message: false });
          })
      } else if(resp.data.message === false) {}
    })
    .catch((error) => {
      return res.send({ message: false });
    })

    await axios
    .get(
      process.env.AN_POST_SERVER +
        '/api/account/find-savings-individual/' +
        id,
      {
        headers: {
          Authorization: refreshTokenPost,
        },
      }
    )
    .then((resp) => {
      if (resp.data.message === true) {
        let data = req.body.transaction
        axios
          .post(
            process.env.AN_POST_SERVER +
              '/api/account/update-savings-account-with/' +
              id,
            data,
            { headers: { Authorization: refreshTokenPost } }
          )
          .then((reply) => {
            if (reply.data.message === true) {
              return res.status(200).send({ message: true })
            }
          })
          .catch((error) => {
            return res.send({ message: false });
          })
      } else {}
    })
    .catch((error) => {
      return res.send({ message: false });
    })

  // // CREDIT UNION CALLS
  await axios
  .get(
    process.env.CREDIT_UNION_SERVER +
      '/api/account/find-current-individual/' +
      id,
    {
      headers: {
        Authorization: refreshTokenCU,
      },
    }
  )
  .then((resp) => {
    if (resp.data.message === true) {
      let data = req.body.transaction
      axios
        .post(
          process.env.CREDIT_UNION_SERVER +
            '/api/account/update-current-account-with/' +
            id,
          data,
          { headers: { Authorization: refreshTokenCU } }
        )
        .then((reply) => {
          if (reply.data.message === true) {
            return res.status(200).send({ message: true })
          }
        })
        .catch((error) => {
          return res.send({ message: false });
        })
    } else {}
  })
  .catch((error) => {
    return res.send({ message: false });
  })

  await axios
  .get(
    process.env.CREDIT_UNION_SERVER +
      '/api/account/find-savings-individual/' +
      id,
    {
      headers: {
        Authorization: refreshTokenCU,
      },
    }
  )
  .then((resp) => {
    if (resp.data.message === true) {
      let data = req.body.transaction
      axios
        .post(
          process.env.CREDIT_UNION_SERVER +
            '/api/account/update-savings-account-with/' +
            id,
          data,
          { headers: { Authorization: refreshTokenCU } }
        )
        .then((reply) => {
          if (reply.data.message === true) {
            return res.status(200).send({ message: true })
          }
        })
        .catch((error) => {
          return res.send({ message: false });
        })
    } else {}
  })
  .catch((error) => {
    return res.send({ message: false });
  })

  // //AIB CALLS

  await axios
  .get(
    process.env.AIB_BANK_SERVER +
      '/api/account/find-current-individual/' +
      id,
    {
      headers: {
        Authorization: refreshTokenAIB,
      },
    }
  )
  .then(async (resp) => {
    if (resp.data.message === true) {
      let data = req.body.transaction
      await axios
        .post(
          process.env.AIB_BANK_SERVER +
            '/api/account/update-current-account-with/' +
            id,
          data,
          { headers: { Authorization: refreshTokenAIB } }
        )
        .then((reply) => {
          if (reply.data.message === true) {
            return res.status(200).send({ message: true })
          }
        })
        .catch((error) => {
          return res.send({ message: false });
        })
    } else {}
  })
  .catch((error) => {
    return res.send({ message: false });
  })

  await axios
    .get(
      process.env.AIB_BANK_SERVER +
        '/api/account/find-savings-individual/' +
        id,
      {
        headers: {
          Authorization: refreshTokenAIB,
        },
      }
    )
    .then((resp) => {
      if (resp.data.message === true) {
        let data = req.body.transaction
        axios
          .post(
            process.env.AIB_BANK_SERVER +
              '/api/account/update-savings-account-with/' +
              id,
            data,
            { headers: { Authorization: refreshTokenAIB } }
          )
          .then((reply) => {
            if (reply.data.message === true) {
              return res.status(200).send({ message: true })
            }
          })
          .catch((error) => {
            return res.send({ message: false });
          })
      } else {}
    })
    .catch((error) => {
      return res.send({ message: false });
    })

  // // BANK OF WIT CALLS

  await axios
    .get(
      process.env.WIT_BANK_SERVER +
        '/api/account/find-current-individual/' +
        id,
      {
        headers: {
          Authorization: refreshTokenBOW,
        },
      }
    )
    .then((resp) => {
      if (resp.data.message === true) {
        let data = req.body.transaction
        axios
          .post(
            process.env.WIT_BANK_SERVER +
              '/api/account/update-current-account-with/' +
              id,
              data,
            { headers: { Authorization: refreshTokenBOW } }
          )
          .then((reply) => {
            if (reply.data.message === true) {
              return res.status(200).send({ message: true })
            }
          })
          .catch((error) => {
            return res.send({ message: false });
          })
      } else {}
    })
    .catch((error) => {
      return res.send({ message: false });
    })

  await axios
    .get(
      process.env.WIT_BANK_SERVER +
        '/api/account/find-savings-individual/' +
        id,
      {
        headers: {
          Authorization: refreshTokenBOW,
        },
      }
    )
    .then((resp) => {
      if (resp.data.message === true) {
        let data = req.body.transaction
        axios
          .post(
            process.env.WIT_BANK_SERVER +
              '/api/account/update-savings-account-with/' +
              id,
            data,
            { headers: { Authorization: refreshTokenBOW } }
          )
          .then((reply) => {
            if (reply.data.message === true) {
              return res.status(200).send({ message: true })
            }
          })
          .catch((error) => {
            return res.send({ message: false });
          })
      } else {}
    })
    .catch((error) => {
      return res.send({ message: false });
    })
  }

// Get all transactions from current account WIT
  router.transactionCurrentWIT= async (req,res)=>{
    await axios
    .get(
      process.env.WIT_BANK_SERVER +
        '/api/account/get-transactions-current/',    
      {
        headers: {
          Authorization: refreshTokenBOW,
        },
      }
    ).then(async resp => {
      let data = resp.data
      if (resp.data.message === true) {
        res.status(200).send({ data, message:true })
      }
      if(resp.data.message === "No transactions"){
        res.send({message:"No transactions"})
      }
    }).catch((error) => {
      return res.status(404).send({ message: false });
    })
  }

// Get all transactions from savings account WIT
  router.transactionSaveingsWIT= async (req,res)=>{
    await axios
    .get(
      process.env.WIT_BANK_SERVER +
        '/api/account/get-transactions-savings/',    
      {
        headers: {
          Authorization: refreshTokenBOW,
        },
      }
    ).then(resp => {
      let data = resp.data
      if (resp.data.message === true) {
        res.status(200).send({ data, message:true })
      }
      if(resp.data.message === "No transactions"){
        res.send({message:"No transactions"})
      }
    }).catch((error) => {
      return res.status(404).send({ message: false });
    })
  }

  // Get all transactions from current account AIB
  router.transactionCurrentAIB= async (req,res)=>{
    await axios
    .get(
      process.env.AIB_BANK_SERVER +
        '/api/account/get-transactions-current/',    
      {
        headers: {
          Authorization: refreshTokenAIB,
        },
      }
    ).then(resp => {
      let data = resp.data
      if (resp.data.message === true) {
        res.status(200).send({ data, message:true })
      }
      if(resp.data.message === "No transactions"){
        res.send({message:"No transactions"})
      }
    }).catch((error) => {
      return res.status(404).send({ message: false });
    })
  }
// Get all transactions from savings account AIB
  router.transactionSaveingsAIB= async (req,res)=>{
    await axios
    .get(
      process.env.AIB_BANK_SERVER +
        '/api/account/get-transactions-savings/',    
      {
        headers: {
          Authorization: refreshTokenAIB,
        },
      }
    ).then(resp => {
      let data = resp.data
      if (resp.data.message === true) {
        res.status(200).send({ data, message:true })
      }
      if(resp.data.message === "No transactions"){
        res.send({message:"No transactions"})
      }
    }).catch((error) => {
      return res.status(404).send({ message: false });
    })
  }

  // Get all transactions from current account CU
  router.transactionCurrentCU= async (req,res)=>{
    await axios
    .get(
      process.env.CREDIT_UNION_SERVER +
        '/api/account/get-transactions-current/',    
      {
        headers: {
          Authorization: refreshTokenCU,
        },
      }
    ).then(resp => {
      let data = resp.data
      if (resp.data.message === true) {
        res.status(200).send({ data, message:true })
      }
      if(resp.data.message === "No transactions"){
        res.send({message:"No transactions"})
      }
    }).catch((error) => {
      return res.status(404).send({ message: false });
    })
  }
// Get all transactions from savings account CU
  router.transactionSaveingsCU= async (req,res)=>{
    await axios
    .get(
      process.env.CREDIT_UNION_SERVER +
        '/api/account/get-transactions-savings/',    
      {
        headers: {
          Authorization: refreshTokenCU,
        },
      }
    ).then(resp => {
      let data = resp.data
      if (resp.data.message === true) {
        res.status(200).send({ data, message:true })
      }
      if(resp.data.message === "No transactions"){
        res.send({message:"No transactions"})
      }
    }).catch((error) => {
      return res.status(404).send({ message: false });
    })
  }

  // Get all transactions from current account Post
  router.transactionCurrentPost= async (req,res)=>{
    await axios
    .get(
      process.env.AN_POST_SERVER +
        '/api/account/get-transactions-current/',    
      {
        headers: {
          Authorization: refreshTokenPost,
        },
      }
    ).then(resp => {
      let data = resp.data
      if (resp.data.message === true) {
        res.status(200).send({ data, message:true })
      }
      if(resp.data.message === "No transactions"){
        res.send({message:"No transactions"})
      }
    }).catch((error) => {
      return res.status(404).send({ message: false });
    })
  }
// Get all transactions from savings account WIT
  router.transactionSaveingsPost= async (req,res)=>{
    await axios
    .get(
      process.env.AN_POST_SERVER +
        '/api/account/get-transactions-savings/',    
      {
        headers: {
          Authorization: refreshTokenPost,
        },
      }
    ).then(resp => {
      let data = resp.data
      if (resp.data.message === true) {
        res.status(200).send({ data, message:true })
      }
      if(resp.data.message === "No transactions"){
        res.send({message:"No transactions"})
      }
    }).catch((error) => {
      return res.status(404).send({ message: false });
    })
  }

module.exports = router
