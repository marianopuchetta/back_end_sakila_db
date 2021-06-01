const db = require('../models')
const errors = require('../errors/errors')
const { Op } = require('sequelize')

const createCustomer = async (store_id, first_name, last_name, email, address_id) => {
  const newCustomer = { store_id, first_name, last_name, email, address_id }
  console.log(newCustomer)

  return await db.Customer.create(newCustomer)
}

const readCustomer = async (limit, offset) => {
  limit = limit && parseInt(limit, 10)
  offset = offset && parseInt(offset, 10)

  return await db.Customer.findAll({ 
    limit,
     offset,
     attributes:['first_name','last_name'],
     include:{
    model: db.Address,
    attributes:['address']
  } })
}

const updateCustomer = async (store_id, first_name, last_name, email, address_id, customer_id) => {
  let customer = await db.Customer.findOne({ where: { id: customer_id } })

  if (!customer) {
    throw new errors.NotFound()
  }

  customer.store_id = store_id ? store_id : customer.store_id
  customer.first_name = first_name ? first_name : customer.first_name
  customer.last_name = last_name ? last_name : customer.last_name
  customer.email = email ? email : customer.email
  customer.address_id = address_id ? address_id : customer.address_id

  await customer.save()
  await customer.reload()
  return customer.toJSON()

}

const removeCustomer = async (customer_id) => {
  let customerToRemove = await db.Customer.findOne({ where: { id: customer_id } })
  if (!customerToRemove) {
    throw new errors.NotFound()
  }

  await customerToRemove.destroy()

  return { ok: 'CustumerRemoved' }
}

module.exports = {
  createCustomer,
  readCustomer,
  updateCustomer,
  removeCustomer
}