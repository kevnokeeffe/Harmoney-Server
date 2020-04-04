let express = require('express')
let router = express.Router()
const axios = require('axios')

router.transactionBreakdown = async (req, res) => {
  const iban = req.body.transaction[0]
// //   const accountId = req.body.transaction[1]
// //   const ammount = req.body.transaction[2]
//   const get = axios.get('http://localhost:8001/api/account/find-current-individual/iban/'+iban)
//   const put = axios.put('http://localhost:8001/api/account/update-current-account/iban/'+iban, req.body)
  
//   console.log(iban)
//   console.log(accountId)

  axios
    .get(
      'http://localhost:8001/api/account/find-current-individual/iban/'+iban
    )
    .then(async(one) => {
      if (one.data.message === false) {
        console.log(one.data)
        return res.status(200).send(one.data.message)
      }
      if (one.data.message === true) {
       await axios.put(
          `http://localhost:8001/api/account/update-current-account/iban/`+iban,req.body
        ).then(resp => {
            return res.status(200).send({message:true})
        })
      }
    })

    // axios.all([get,put]).then(axios.spread((getA,putA) => {
    //     console.log(getA,putA)
    // }))
}

module.exports = router
