const router = require('express').Router()
const inventoryController = require('../controllers/inventoryController')
const requireLogin = require('../middleware/requirelogin')


router.post(
  '/',
  requireLogin,
  inventoryController.create
)
router.get(
  '/',
  requireLogin,
  inventoryController.read
)
router.put(
  '/:id',
  requireLogin,
  inventoryController.update
)
router.delete(
  '/:id',
  requireLogin,
  inventoryController.remove
)



module.exports = router