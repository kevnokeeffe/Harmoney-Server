const express = require('express')
const router = express.Router()
const controller = require('../controllers/accounts-controller/accounts-controller')
const auth = require('../middleware/authenticate')

/* GET accounts listing. */
// router.post('/account', controller.create)
router.get('/current-all', auth.verifyToken, controller.getAllCurrentAccounts)
router.get('/savings-all', auth.verifyToken, controller.getAllSavingsAccounts)
router.get('/current-individual/:id', auth.verifyToken, controller.getIndividualCurrentAccount)
router.get('/savings-individual/:id', controller.getIndividualSavingsAccount)
router.put('/current-individual-update/:id', auth.verifyToken, controller.updateCurrentAccount)
router.put('/savings-individual-update/:id', auth.verifyToken, controller.updateSavingsAccount)
// router.delete('/account/delete', controller.remove)

module.exports = router
