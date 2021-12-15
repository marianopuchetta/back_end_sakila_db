const router = require('express').Router()
const cityController = require('../controllers/cityController')
const requireLogin = require('../middleware/requireLogin')

router.post(
    '/',
    requireLogin,
    cityController.create
)
router.get(
    '/',
    requireLogin,
    cityController.read
)
router.put(
    '/:id',
    requireLogin,
    cityController.update
)
router.delete(
    '/:id',
    requireLogin,
    cityController.remove
)

module.exports = router