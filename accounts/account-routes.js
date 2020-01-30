const express = require('express')
const router = express.Router()
import * as controller from './accounts-controller'
/* GET accounts listing. */
router.post('/account', controller.create)
router.get('/account', controller.index)
router.get('/account/:id', controller.show)
router.put('/account/update', controller.update)
router.delete('/account/delete', controller.remove)

module.exports = router
