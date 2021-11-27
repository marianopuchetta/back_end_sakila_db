const router = require('express').Router()
const categoryController = require('../controllers/categoryController')
const requireLogin = require('../middleware/requireLogin')

router.post('/', requireLogin,
    categoryController.create)

router.get('/', requireLogin,
    categoryController.read)

router.put('/:id', requireLogin,
    categoryController.update)

router.delete('/:id', requireLogin,
    categoryController.remove)

module.exports = router;