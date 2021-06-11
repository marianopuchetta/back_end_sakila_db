const db = require('../models')
const errors = require('../errors/errors')
const { Op } = require('sequelize')

const createPayment = async (customer_id, staff_id, rental_id, amount, payment_date, userId) => {
    const newPayment = { customer_id, staff_id, rental_id, amount, payment_date }

    return await db.Payment.create(newPayment)
}

const readPayment = async (limit, offset) => {
    limit = limit && parseInt(limit, 10)
    offset = offset && parseInt(offset, 10)

    return await db.Payment.findAll({
        limit,
        offset,
        raw: true,
        attributes:['amount'],
        include: [{
            model: db.Customer,
            attributes: ['first_name', 'last_name'],
        },
        {
            model: db.Staff,
            attributes: ['first_name', 'last_name']
        },
        {
            model: db.Rental,
        }]
    })
}

const updatePayment = async (customer_id, staff_id, rental_id, amount, payment_date, paymentId, userId) => {
    let payment = await db.Payment.findOne({ where: { id: paymentId } })

    if (!payment) {
        throw new errors.NotFound()
    }

    payment.customer_id = customer_id ? customer_id : payment.customer_id
    payment.staff_id = staff_id ? staff_id : payment.staff_id
    payment.rental_id = rental_id ? rental_id : payment.rental_id
    payment.amount = amount ? amount : payment.amount
    payment.payment_date = payment_date ? payment_date : payment.payment_date

    await payment.save()
    await payment.reload()
    return payment.toJSON()
}

const removePayment = async (paymentId) => {
    let payment = await db.payment.findOne({ where: { id: paymentId } })

    if (!payment) {
        throw new errors.NotFound()
    }


    await Payment.destroy()

    return { ok: "PaymentRemoved" }
}

module.exports = {
    createPayment,
    readPayment,
    updatePayment,
    removePayment,
}