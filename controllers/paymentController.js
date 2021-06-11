const paymentService = require('../services/paymentService')

const create = async (req, res) => {
  const { customer_id,staff_id,rental_id,amount,payment_date } = req.body
  const { userId } = req.user
  let code = 201
  let resContent = {}

  try {
    resContent = await paymentService.createPayment(customer_id,staff_id,rental_id,amount,payment_date, userId)
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
    content = await paymentService.readPayment(limit, offset)
  } catch (error) {
    console.log(error)
    code = error.statusCode || 500
    content = { error: error.errorMessage }
  }

  res.status(code).json(content)
}

const update = async (req, res) => {
  const { customer_id,staff_id,rental_id,amount,payment_date } = req.body
  const { id: paymentId } = req.params
  const { userId } = req.user

  let code = 200
  let resContent = {}

  try {
    resContent = await paymentService.updatePayment(customer_id,staff_id,rental_id,amount,payment_date,paymentId, userId)
  } catch (error) {
    code = error.statusCode || 500
    resContent = { error: error.errorMessage }
  }
  res.status(code).json(resContent)
}

const remove = async (req, res) => {
  const { id: paymentId } = req.params
  let code = 200
  let content = {}

  try {
    content = await paymentService.removePayment(paymentId)
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
