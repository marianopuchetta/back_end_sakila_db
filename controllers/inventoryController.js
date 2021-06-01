const inventoryService = require('../services/inventoryService')

const create = async (req, res) => {
  const { film_id,store_id } = req.body
  const { userId } = req.user
  let code = 201
  let resContent = {}

  try {
    resContent = await inventoryService.createInventory(film_id,store_id, userId)
  } catch (error) {
    console.log(error)
    code = error.statusCode || 500
    resContent = { error: error.errorMessage }
  }
  console.log(resContent)

  res.status(code).json(resContent)
}

const read = async (req, res) => {
  const { limit, offset } = req.query
  let code = 200
  let content = {}
  try {
    content = await inventoryService.readInventory(limit, offset)
  } catch (error) {
    console.log(error)
    code = error.statusCode || 500
    content = { error: error.errorMessage }
  }

  res.status(code).json(content)
}

const update = async (req, res) => {
  const { film_id,store_id } = req.body
  const { id: inventoryId } = req.params
  const { userId } = req.user

  let code = 200
  let resContent = {}

  try {
    resContent = await inventoryService.updateInventory(film_id,store_id,inventoryId, userId)
  } catch (error) {
    code = error.statusCode || 500
    resContent = { error: error.errorMessage }
    console.log(error)
  }
  res.status(code).json(resContent)
}

const remove = async (req, res) => {
  const { id: inventoryId } = req.params
  let code = 200
  let content = {}

  try {
    content = await inventoryService.removeInventory(inventoryId)
  } catch (error) {
    code = error.statusCode || 500
    content = { error: error.errorMessage }
  }

  res.status(code).json(content)
}

module.exports = { 
  create,
   read,
   update,
   remove
}
