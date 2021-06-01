const db = require('../models')
const errors = require('../errors/errors')
const { Op } = require('sequelize')

const createStore = async (address_id,manager_staff_id, userId) => {
  const newStore = { address_id,manager_staff_id }
  console.log(newStore)

  return await db.Store.create(newStore)
}

const readStore = async (limit, offset) => {
  limit = limit && parseInt(limit, 10)
  offset = offset && parseInt(offset, 10)

  return await db.Store.findAll({
    limit,
    offset,
    include: [{
      model: db.Address,
      as: 'address',
      attributes: ['address']
    },{
      model: db.Staff,
      as:'manager_staff',
      attributes:['first_name','last_name']
    }]
  })
}

const updateStore = async (address_id,manager_staff_id, storeId, userId) => {
  let store = await db.Store.findOne({ where: { id: storeId } })

  if (!store) {
    throw new errors.NotFound()
  }

  store.address_id = address_id ? address_id : store.address_id
  store.manager_staff_id = manager_staff_id ? manager_staff_id : store.manager_staff_id
  console.log(store.address_id + ' ' + store.manager_staff_id + ' ' + address_id + ' ' + manager_staff_id)
  await store.save()
  await store.reload()
  return store.toJSON()
}

const removeStore = async (storeId) => {
  let store = await db.Store.findOne({ where: { id: storeId } })

  if (!store) {
    throw new errors.NotFound()
  }


  await store.destroy()

  return { ok: "StoreRemoved" }
}

module.exports = {
  createStore,
  readStore,
  updateStore,
  removeStore,
}