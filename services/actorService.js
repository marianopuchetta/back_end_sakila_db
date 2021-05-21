const db = require('../models')
const errors = require('../errors/errors')
const { Op } = require('sequelize')

const createActor = async (first_name,last_name, userId) => {
  const newActor = { first_name,last_name }

  return await db.Actor.create(newActor)
}

const readActor = async (limit, offset) => {
  limit = limit && parseInt(limit, 10)
  offset = offset && parseInt(offset, 10)

  return await db.Actor.findAll({ limit, offset})
}

const updateActor = async (first_name,last_name, actorId, userId) => {
  let actor = await db.Actor.findOne({ where: { id: actorId } })

  if (!actor) {
    throw new errors.NotFound()
  }

  actor.first_name = first_name ? first_name : actor.first_name
  actor.last_name = last_name ? last_name : actor.last_name
  await actor.save()
  await actor.reload()
  return actor.toJSON()
}

const removeActor = async (actorId) => {
  let actor = await db.Actor.findOne({ where: { id: actorId } })

  if (!actor) {
    throw new errors.NotFound()
  }


  await actor.destroy()

  return { ok: "ActorRemoved" }
}

module.exports = { 
  createActor, 
  readActor, 
  updateActor, 
  removeActor, 
}