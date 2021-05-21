const actorService = require('../services/actorService')

const create = async (req, res) => {
  const { first_name,last_name } = req.body
  const { userId } = req.user
  let code = 201
  let resContent = {}

  try {
    resContent = await actorService.createActor(first_name,last_name, userId)
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
    content = await actorService.readActor(limit, offset)
  } catch (error) {
    console.log(error)
    code = error.statusCode || 500
    content = { error: error.errorMessage }
  }

  res.status(code).json(content)
}

const update = async (req, res) => {
  const { first_name,last_name } = req.body
  const { id: actorId } = req.params
  const { userId } = req.user

  let code = 200
  let resContent = {}

  try {
    resContent = await actorService.updateActor(first_name,last_name,actorId, userId)
  } catch (error) {
    code = error.statusCode || 500
    resContent = { error: error.errorMessage }
  }
  res.status(code).json(resContent)
}

const remove = async (req, res) => {
  const { id: actorId } = req.params
  let code = 200
  let content = {}

  try {
    content = await actorService.removeActor(actorId)
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
