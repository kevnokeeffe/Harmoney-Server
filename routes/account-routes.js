const express = require('express')
const router = express.Router()
const controller = require('../controllers/accounts-controller/accounts-controller')
/* GET accounts listing. */
// router.post('/account', controller.create)
router.get('/current-all', controller.getAllCurrentAccounts)
router.get('/savings-all', controller.getAllSavingsAccounts)
router.get('/current-individual/:id', controller.getIndividualCurrentAccount)
router.get('/savings-individual/:id', controller.getIndividualSavingsAccount)
router.put('/current-individual-update/:id', controller.updateCurrentAccount)
router.put('/savings-individual-update/:id', controller.updateSavingsAccount)
// router.delete('/account/delete', controller.remove)

module.exports = router
