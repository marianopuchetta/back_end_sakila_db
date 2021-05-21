const Joi = require("joi");

const create = Joi.object({
  name: Joi.string().required(),
  lastname: Joi.string().required(),
  password: Joi.string().required(),
  alias: Joi.string().required(),
  email: Joi.string().required(),
})

const login = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
})

module.exports = { create, login }