const rentalService = require('../services/rentalService')

const create = async (req, res) => {
  const { inventory_id,customer_id,staff_id } = req.body
  const { userId } = req.user
  let code = 201
  let resContent = {}

  try {
    resContent = await rentalService.createRental(inventory_id,customer_id,staff_id,userId)
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
    content = await rentalService.readRental(limit, offset)
  } catch (error) {
    console.log(error)
    code = error.statusCode || 500
    content = { error: error.errorMessage }
  }

  res.status(code).json(content)
}

const update = async (req, res) => {
  const { rental_date,inventory_id,customer_id,return_date,staff_id } = req.body
  const { id: rentalId } = req.params
  const { userId } = req.user

  let code = 200
  let resContent = {}

  try {
    resContent = await rentalService.updateRental(rental_date,inventory_id,customer_id,return_date,staff_id,rentalId, userId)
  } catch (error) {
    code = error.statusCode || 500
    resContent = { error: error.errorMessage }
  }
  res.status(code).json(resContent)
}

const remove = async (req, res) => {
  const { id: rentalId } = req.params
  let code = 200
  let content = {}

  try {
    content = await rentalService.removeRental(rentalId)
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
