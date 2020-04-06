let express = require('express')
let router = express.Router()
const axios = require('axios')
const FiRecord = require('../../models/financial-institution/financial-institution-details')
const FiDetails = require('../../models/financial-institution/account')


router.transactionBreakdown = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const id = req.body.transaction[1]
  let refreshTokenPost = null
  let refreshTokenBOW = null
  let refreshTokenCU = null
  let refreshTokenAIB = null
  let verification = false

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
      process.env.AN_POST_SERVER + '/api/account/find-current-individual/' + id,
      { headers: { Authorization: refreshTokenPost } }
    )
    .then(async (resp) => {
        if (resp.data.message === true) {
          console.log(resp.data.message)
        axios.put(process.env.AN_POST_SERVER+'/api/account/update-current-account/'+id,req,{ headers: { Authorization: refreshTokenPost } })
          .then(reply => {
              if(reply.data.message ===true){
                console.log(reply.data.message)
                return res.status(200).send({ message: true })
              }
          })  .catch((error) => {
            //return res.send({ message: false });
          }) 
        }
        else{console.log(resp.data.message)}
      })
    .catch((error) => {
      //return res.send({ message: false });
    })

  await axios
    .get(
      process.env.AN_POST_SERVER + '/api/account/find-savings-individual/' + id,
      { headers: { Authorization: refreshTokenPost } }
    )
    .then((resp) => {
      if (resp.data.message === true) {
        axios.put(process.env.AN_POST_SERVER+'/api/account/update-savings-account/'+id,req,{ headers: { Authorization: refreshTokenPost } })
          .then(reply => {
              if(reply.data.message ===true){
                console.log(reply.data.message)
                return res.status(200).send({ message: true })
              }
          }).catch((error) => {
            //return res.send({ message: false });
          })
      }
      else{console.log(resp.data.message)}
      
    })
    .catch((error) => {
      //return res.send({ message: false });
    })

  // CREDIT UNION CALLS
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
            axios.put(process.env.CREDIT_UNION_SERVER+'/api/account/update-current-account/'+id,req,{ headers: { Authorization: refreshTokenCU } })
            .then(reply => {
                if(reply.data.message ===true){
                  console.log(reply.data.message)
                  return res.status(200).send({ message: true })
                }
            }).catch((error) => {
                //return res.send({ message: false });
              })
        }
        else{console.log(resp.data.message)}
      })
    .catch((error) => {
      //return res.send({ message: false });
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
            axios.put(process.env.CREDIT_UNION_SERVER+'/api/account/update-savings-account/'+id,req,{ headers: { Authorization: refreshTokenCU } })
            .then(reply => {
                if(reply.data.message ===true){
                  console.log(reply.data.message)
                  return res.status(200).send({ message: true })
                }
            }).catch((error) => {
                //return res.send({ message: false });
              })
        }
        else{console.log(resp.data.message)}
      })
    .catch((error) => {
      //return res.send({ message: false });
    })

  //AIB CALLS

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
  .then((resp) => {
      if (resp.data.message === true) {
        axios.put(process.env.AIB_BANK_SERVER+'/api/account/update-current-account/'+id,req,{ headers: { Authorization: refreshTokenAIB } })
            .then(reply => {
                if(reply.data.message ===true){
                  console.log(reply.data.message)
                  return res.status(200).send({ message: true })
                }
            }).catch((error) => {
                //return res.send({ message: false });
              })
      }
      else{console.log(resp.data.message)}
    })
  .catch((error) => {
    //return res.send({ message: false });
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
            axios.put(process.env.AIB_BANK_SERVER+'/api/account/update-savings-account/'+id,req,{ headers: { Authorization: refreshTokenAIB } })
            .then(reply => {
                if(reply.data.message ===true){
                  console.log(reply.data.message)
                  return res.status(200).send({ message: true })
                }
            }).catch((error) => {
                //return res.send({ message: false });
              })
        }
        else{console.log(resp.data.message)}
      })
    .catch((error) => {
      //return res.send({ message: false });
    })

  // BANK OF WIT CALLS

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
            axios.put(process.env.WIT_BANK_SERVER+'/api/account/update-current-account/'+id,req,{ headers: { Authorization: refreshTokenBOW } })
            .then(reply => {
                if(reply.data.message ===true){
                  console.log(reply.data.message)
                  return res.status(200).send({ message: true })
                }
            }).catch((error) => {
                //return res.send({ message: false });
              })
        }
        else{console.log(resp.data.message)}
      })
    .catch((error) => {
      //return res.send({ message: false });
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
            axios.put(process.env.WIT_BANK_SERVER+'/api/account/update-savings-account/'+id,req,{ headers: { Authorization: refreshTokenBOW } })
            .then(reply => {
                if(reply.data.message ===true){
                  console.log(reply.data.message)
                  return res.status(200).send({ message: true })
                }
            }).catch((error) => {
                //return res.send({ message: false });
              })
        }
        else{console.log(resp.data.message)}
      })
    .catch((error) => {
      //return res.send({ message: false });
    })
}

module.exports = router
