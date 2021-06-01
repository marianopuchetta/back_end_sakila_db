const db = require('../models')
const errors = require('../errors/errors')
const { Op } = require('sequelize')

const createInventory = async (film_id, store_id, userId) => {
  const newInventory = { film_id, store_id }
  return await db.Inventory.create(newInventory)
}

const readInventory = async (limit, offset) => {
  limit = limit && parseInt(limit, 10)
  offset = offset && parseInt(offset, 10)

  return await db.Inventory.findAll({
    limit,
    offset,
    attributes: ['id', [db.Inventory.sequelize.fn('count', db.Inventory.sequelize.col('film_id')), 'count']],
    include: [{
      model: db.Film,
      as: 'film',
      attributes: ['id', 'film_id']
    }, {
      model: db.Store,
      as: 'store',
      attributes: ['id'],
      include: {
        model: db.Address,
        as: 'address',
        attributes: ['address'],

      }
    }],
    group: ['film_id', 'store_id']


  })
}
const updateInventory = async (film_id, store_id, inventoryId, userId) => {
  let inventory = await db.Inventory.findOne({ where: { id: inventoryId } })

  if (!inventory) {
    throw new errors.NotFound()
  }

  await db.Inventory.update({
    film_id: film_id,
    store_id: store_id
  }, {
    where: {
      id: inventoryId
    }
  });

  inventory = await db.Inventory.findOne({ where: { id: inventoryId } })

  return inventory.toJSON()
}

const removeInventory = async (inventoryId) => {
  let inventory = await db.Inventory.findOne({ where: { id: inventoryId } })

  if (!inventory) {
    throw new errors.NotFound()
  }


  await inventory.destroy()

  return { ok: "InventoryRemoved" }
}

module.exports = {
  createInventory,
  readInventory,
  updateInventory,
  removeInventory,
}