const userService = require('../services/userservice')

const register = async (req, res) => {
  const { name, lastname, password, alias, email } = req.body
  let code = 201
  let content = {}

  try {
    content = await userService.createUser(
      name,
      lastname,
      alias,
      email,
      password
    )
  } catch (error) {
    console.log(error)
    code = error.statusCode || 500
    content = { error: error.errorMessage }
  }

  res.status(code).json(content)
}

const login = async (req, res) => {
  const body = req.body
  let code = 201
  let content = {}

  try {
    content = await userService.logUser(body.email, body.password)
  } catch (error) {
    code = error.statusCode || 500
    content = { error: error.errorMessage }
  }

  res.status(code).json(content)
}

module.exports = {
  register,
  login,
}
