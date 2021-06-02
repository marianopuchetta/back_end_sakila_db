const router = require('express').Router()
const rentalController = require('../controllers/rentalController')
const requireLogin = require('../middleware/requirelogin')


router.post(
  '/',
  requireLogin,
  rentalController.create
)
router.get(
  '/',
  requireLogin,
  rentalController.read
)
router.put(
  '/:id',
  requireLogin,
  rentalController.update
)
router.delete(
  '/:id',
  requireLogin,
  rentalController.remove
)



module.exports = router