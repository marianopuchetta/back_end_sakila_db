const router = require('express').Router()
const storeController = require('../controllers/storeController')
const requireLogin = require('../middleware/requirelogin')


router.post(
  '/',
  requireLogin,
  storeController.create
)
router.get(
  '/',
  requireLogin,
  storeController.read
)
router.put(
  '/:id',
  requireLogin,
  storeController.update
)
router.delete(
  '/:id',
  requireLogin,
  storeController.remove
)



module.exports = router