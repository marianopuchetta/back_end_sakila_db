const jwt = require('../util/jwtmanager')
const crypt = require('../util/crypt')
const db = require('../models')
const errors = require('../errors/errors')

const createUser = async (name, lastname, alias, email, password) => {
  const user = await db.User.findOne({ where: { email } })

  if(user) {
    throw new errors.AlreadyExists()
  }

  const hashedpassword = await crypt.encrypt(password)
  const newUser = {
    name,
    lastname,
    email,
    password: hashedpassword,
    alias,
    roleId: 3,
  }
  return await db.User.create(newUser)
}

const logUser = async (email, password) => {
  const user = await db.User.findOne({
    where: {
      email,
    },
  })

  if (!user) {
    throw new errors.InvalidCredentials()
  }
  const isValidate = await crypt.validate(password, user.password)
  if (!isValidate) {
    throw new errors.InvalidCredentials()
  }

  const jwtPayload = {
    id: user.id,
    roleId: user.roleId,
  }
  return { jwt: jwt.createOneHourJWT(jwtPayload) }
}

module.exports = {
  logUser,
  createUser,
}
