const router = require('express').Router()
const paymentController = require('../controllers/paymentController')
const requireLogin = require('../middleware/requirelogin')


router.post(
  '/',
  requireLogin,
  paymentController.create
)
router.get(
  '/',
  requireLogin,
  paymentController.read
)
router.put(
  '/:id',
  requireLogin,
  paymentController.update
)
router.delete(
  '/:id',
  requireLogin,
  paymentController.remove
)



module.exports = router