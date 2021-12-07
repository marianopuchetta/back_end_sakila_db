const router = require('express').Router()
const countryController = require('../controllers/countryController')
const requireLogin = require('../middleware/requireLogin')

router.post(
    '/',
    requireLogin,
    countryController.create
)
router.get(
    '/',
    requireLogin,
    countryController.read
    )
router.put(
    '/:id',
    requireLogin,
    countryController.update
)
router.delete(
    '/:id',
    requireLogin,
    countryController.remove
)

module.exports = router