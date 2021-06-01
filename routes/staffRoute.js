const router = require('express').Router()
const staffController = require('../controllers/staffController')
const requireLogin = require('../middleware/requirelogin')


router.post(
  '/',
  requireLogin,
  staffController.create
)
router.get(
  '/',
  requireLogin,
  staffController.read
)
router.put(
  '/:id',
  requireLogin,
  staffController.update
)
router.delete(
  '/:id',
  requireLogin,
  staffController.remove
)



module.exports = router