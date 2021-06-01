const db = require('../models')
const errors = require('../errors/errors')
const { Op } = require('sequelize')
const crypt = require('../util/crypt')


const createStaff = async (first_name, last_name, address_id,
  picture, email, store_id, active, username, password, userId) => {

  const user = await db.Staff.findOne({ where: { email } })
  if (user) {
    throw new errors.AlreadyExists()
  }

  const hashedpassword = await crypt.encrypt(password)

  const newStaff = {
    first_name,
    last_name,
    address_id,
    picture,
    email,
    store_id,
    active,
    username,
    password: hashedpassword
  }

  return await db.Staff.create(newStaff)
}

const readStaff = async (limit, offset) => {
  limit = limit && parseInt(limit, 10)
  offset = offset && parseInt(offset, 10)

  return await db.Staff.findAll({
    limit, offset,
    attributes: ['first_name', 'last_name', 'username'],
    include: [{
      model: db.Store,
      as: 'store',
      include: { model: db.Address,as:'address' },
      
    }]
  })
}

const updateStaff = async (first_name, last_name, address_id,
  picture, email, store_id, active, username, password, staffId, userId) => {
  let staff = await db.Staff.findOne({ where: { id: staffId } })

  if (!staff) {
    throw new errors.NotFound()
  }

  staff.first_name = first_name ? first_name : staff.first_name
  staff.last_name = last_name ? last_name : staff.last_name
  staff.address_id = address_id ? address_id : staff.address_id
  staff.picture = picture ? picture : staff.picture
  staff.email = email ? email : staff.email
  staff.store_id = store_id ? store_id : staff.store_id
  staff.active = active ? active : staff.active
  staff.username = username ? username : staff.username
  staff.password = password ? password : staff.password

  await staff.save()
  await staff.reload()
  return staff.toJSON()
}

const removeStaff = async (staffId) => {
  let staff = await db.Staff.findOne({ where: { id: staffId } })

  if (!staff) {
    throw new errors.NotFound()
  }


  await staff.destroy()

  return { ok: "StaffRemoved" }
}

module.exports = {
  createStaff,
  readStaff,
  updateStaff,
  removeStaff,
}