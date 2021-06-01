const staffService = require('../services/staffService')

const create = async (req, res) => {
  const { first_name,last_name,address_id,
    picture,email,store_id,active,username,password } = req.body
  const { userId } = req.user
  let code = 201
  let resContent = {}

  try {
    resContent = await staffService.createStaff(first_name,last_name,address_id,
        picture,email,store_id,active,username,password, userId)
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
    content = await staffService.readStaff(limit, offset)
  } catch (error) {
    console.log(error)
    code = error.statusCode || 500
    content = { error: error.errorMessage }
  }

  res.status(code).json(content)
}

const update = async (req, res) => {
  const { first_name,last_name,address_id,
    picture,email,store_id,active,username,password } = req.body
  const { id: staffId } = req.params
  const { userId } = req.user

  let code = 200
  let resContent = {}

  try {
    resContent = await staffService.updateStaff(first_name,last_name,address_id,
        picture,email,store_id,active,username,password,staffId, userId)
  } catch (error) {
    code = error.statusCode || 500
    resContent = { error: error.errorMessage }
  }
  res.status(code).json(resContent)
}

const remove = async (req, res) => {
  const { id: staffId } = req.params
  let code = 200
  let content = {}

  try {
    content = await staffService.removeStaff(staffId)
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
