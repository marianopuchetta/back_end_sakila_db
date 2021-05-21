const router = require('express').Router()
const customerController = require('../controllers/customerController')
const requireLogin = require('../middleware/requirelogin')


router.post(
  '/',
  requireLogin,
  customerController.create
)
router.get(
  '/',
  requireLogin,
  customerController.read
)
// router.put(
//   '/:id',
//   requireLogin,
//   customerController.update
// )
// router.delete(
//   '/:id',
//   requireLogin,
//   customerController.remove
// )



module.exports = router