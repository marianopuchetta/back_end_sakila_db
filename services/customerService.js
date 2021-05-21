const db = require('../models')
const errors = require('../errors/errors')
const { Op } = require('sequelize')

const createCustomer = async (store_id, first_name, last_name, email, address_id ) => {
  const newCustomer = { store_id, first_name, last_name, email, address_id   }
  console.log(newCustomer)

  return await db.Customer.create(newCustomer)
}

const readCustomer = async (limit, offset) => {
  limit = limit && parseInt(limit, 10)
  offset = offset && parseInt(offset, 10)

  return await db.Customer.findAll({ limit, offset})
}

module.exports = {
    createCustomer,
    readCustomer
}