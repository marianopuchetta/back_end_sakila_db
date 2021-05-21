const router = require('express').Router()
const usersController = require('../controllers/userController')
const joiValidator = require('../middleware/joiValidator')
const userSchema = require('../joi/user')

router.post(
  '/', 
  joiValidator(userSchema.create, 'body'),
  usersController.register
)
router.post(
  '/session/login',
  joiValidator(userSchema.login, 'body'),
  usersController.login
)

module.exports = router