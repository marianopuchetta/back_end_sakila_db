const router = require('express').Router()
const actorController = require('../controllers/actorController')
const requireLogin = require('../middleware/requirelogin')


router.post(
  '/',
  requireLogin,
  actorController.create
)
router.get(
  '/',
  requireLogin,
  actorController.read
)
router.put(
  '/:id',
  requireLogin,
  actorController.update
)
router.delete(
  '/:id',
  requireLogin,
  actorController.remove
)



module.exports = router