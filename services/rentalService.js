const db = require('../models')
const errors = require('../errors/errors')
const { Op } = require('sequelize')

const createRental = async (inventory_id, customer_id, staff_id, userId) => {
    const newRental = {
        rental_date: Date.now(),
        inventory_id,
        customer_id,
        return_date:Date.now(),
        staff_id
    }

    return await db.Rental.create(newRental)
}

const readRental = async (limit, offset) => {
    limit = limit && parseInt(limit, 10)
    offset = offset && parseInt(offset, 10)

    return await db.Rental.findAll({ limit, offset })
}

const updateRental = async (rental_date, inventory_id, customer_id, return_date, staff_id, rentalId, userId) => {
    let rental = await db.Rental.findOne({ where: { id: rentalId } })

    if (!rental) {
        throw new errors.NotFound()
    }

    rental.rental_date = rental_date ? rental_date : rental.rental_date
    rental.inventory_id = inventory_id ? inventory_id : rental.inventory_id
    rental.customer_id = customer_id ? customer_id : rental.customer_id
    rental.return_date = return_date ? return_date : rental.return_date
    rental.staff_id = staff_id ? staff_id : rental.staff_id

    await rental.save()
    await rental.reload()
    return rental.toJSON()
}

const removeRental = async (rentalId) => {
    let rental = await db.Rental.findOne({ where: { id: rentalId } })

    if (!rental) {
        throw new errors.NotFound()
    }


    await rental.destroy()

    return { ok: "RentalRemoved" }
}

module.exports = {
    createRental,
    readRental,
    updateRental,
    removeRental,
}