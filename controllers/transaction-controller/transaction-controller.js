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
          .put(
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
          .put(
            process.env.AN_POST_SERVER +
              '/api/account/update-savings-account-with/' +
              id,
            data,
            { headers: { Authorization: refreshTokenPost } }
          )
          .then((reply) => {
            if (reply.data.message === true) {
              console.log(reply.data.message)
              return res.status(200).send({ message: true })
            }
          })
          .catch((error) => {
            console.log('post 0.2')
            return res.send({ message: false });
          })
      } else {
        console.log('post s' + resp.data.message)
      }
    })
    .catch((error) => {
      console.log('post 2')
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
        .put(
          process.env.CREDIT_UNION_SERVER +
            '/api/account/update-current-account-with/' +
            id,
          data,
          { headers: { Authorization: refreshTokenCU } }
        )
        .then((reply) => {
          if (reply.data.message === true) {
            console.log(reply.data.message)
            return res.status(200).send({ message: true })
          }
        })
        .catch((error) => {
          console.log('cu 0.1')
          return res.send({ message: false });
        })
    } else {
      console.log('cu c ' + resp.data.message)
    }
  })
  .catch((error) => {
    console.log('cu 1')
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
        .put(
          process.env.CREDIT_UNION_SERVER +
            '/api/account/update-savings-account-with/' +
            id,
          data,
          { headers: { Authorization: refreshTokenCU } }
        )
        .then((reply) => {
          if (reply.data.message === true) {
            console.log(reply.data.message)
            return res.status(200).send({ message: true })
          }
        })
        .catch((error) => {
          console.log('cu s ')
          return res.send({ message: false });
        })
    } else {
      console.log('cu s ' + resp.data.message)
    }
  })
  .catch((error) => {
    console.log('cu s ')
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
  .then((resp) => {
    if (resp.data.message === true) {
      console.log(req.body)
      let data = req.body.transaction
      axios
        .put(
          process.env.AIB_BANK_SERVER +
            '/api/account/update-current-account-with/' +
            id,
          data,
          { headers: { Authorization: refreshTokenAIB } }
        )
        .then((reply) => {
          if (reply.data.message === true) {
            console.log(reply.data.message)
            return res.status(200).send({ message: true })
          }
        })
        .catch((error) => {
          return res.send({ message: false });
        })
    } else {
      console.log('aib c ' + resp.data.message)
    }
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
        console.log(req.body)
        axios
          .put(
            process.env.AIB_BANK_SERVER +
              '/api/account/update-savings-account-with/' +
              id,
            data,
            { headers: { Authorization: refreshTokenAIB } }
          )
          .then((reply) => {
            if (reply.data.message === true) {
              console.log(reply.data.message)
              return res.status(200).send({ message: true })
            }
          })
          .catch((error) => {
            return res.send({ message: false });
          })
      } else {
        console.log('AIB s ' + resp.data.message)
      }
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
        console.log(req.body.transaction)
        let data = req.body.transaction
        axios
          .put(
            process.env.WIT_BANK_SERVER +
              '/api/account/update-current-account-with/' +
              id,
              data,
            { headers: { Authorization: refreshTokenBOW } }
          )
          .then((reply) => {
            if (reply.data.message === true) {
              console.log(reply.data.message)
              return res.status(200).send({ message: true })
            }
          })
          .catch((error) => {
            return res.send({ message: false });
          })
      } else {
        console.log('WIT c ' + resp.data.message)
      }
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
          .put(
            process.env.WIT_BANK_SERVER +
              '/api/account/update-savings-account-with/' +
              id,
            data,
            { headers: { Authorization: refreshTokenBOW } }
          )
          .then((reply) => {
            if (reply.data.message === true) {
              console.log(reply.data.message)
              return res.status(200).send({ message: true })
            }
          })
          .catch((error) => {
            return res.send({ message: false });
          })
      } else {
        console.log('WIT s ' + resp.data.message)
      }
    })
    .catch((error) => {
      return res.send({ message: false });
    })



  }

module.exports = router
