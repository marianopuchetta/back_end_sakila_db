const storeService = require('../services/storeService')

const create = async (req, res) => {
  const { address_id,manager_staff_id } = req.body
  const { userId } = req.user
  let code = 201
  let resContent = {}

  try {
    resContent = await storeService.createStore(address_id,manager_staff_id, userId)
  } catch (error) {
    console.log(error)
    code = error.statusCode || 500
    resContent = { error: error.errorMessage }
  }

  res.status(code).json(resContent)
}

const read = async (req, res) => {
  const { limit, offset } = req.query
  let code = 200
  let content = {}
  try {
    content = await storeService.readStore(limit, offset)
  } catch (error) {
    console.log(error)
    code = error.statusCode || 500
    content = { error: error.errorMessage }
  }

  res.status(code).json(content)
}

const update = async (req, res) => {
  const { address_id,manager_staff_id } = req.body
  const { id: storeId } = req.params
  const { userId } = req.user
  let code = 200
  let resContent = {}

  try {
    resContent = await storeService.updateStore(address_id,manager_staff_id,storeId, userId)
  } catch (error) {
    code = error.statusCode || 500
    resContent = { error: error.errorMessage }
  }
  res.status(code).json(resContent)
}

const remove = async (req, res) => {
  const { id: storeId } = req.params
  let code = 200
  let content = {}

  try {
    content = await storeService.removeStore(storeId)
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
