const db = require('../models')
const errors = require('../errors/errors')
const { Op } = require('sequelize')

const createPayment = async (customer_id, staff_id, rental_id, amount, payment_date, userId) => {
    const newPayment = { customer_id, staff_id, rental_id, amount, payment_date }

    return await db.Payment.create(newPayment)
}

/**
   select c.id,c.first_name,c.last_name,count(*) as 'transactions',sum(p.amount) as 'total'
   from payments p
   join customers c  on c.id = p.customer_id 
   group by c.id
   order by sum(p.amount) desc

 * @param {*} limit 
 * @param {*} offset 
 * @returns 
 */
const readPayment = async (limit, offset) => {
    limit = limit && parseInt(limit, 10)
    offset = offset && parseInt(offset, 10)

    return await db.Payment.findAll({
        limit,
        offset,
        // raw: true,
        group: db.Customer.sequelize.col('customer_id'),
        attributes: [[db.Customer.sequelize.fn('count', db.Customer.sequelize.col('customer_id')), 'transactions'],
                    [db.Payment.sequelize.fn('sum', db.Payment.sequelize.col('amount')), 'total_amount']],
        order: [[db.Payment.sequelize.col('total_amount'), 'DESC']],
        include: [{
            model: db.Customer,
            as: 'customer',
            attributes: ['id', 'first_name', 'last_name'],
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
    let payment = await db.Payment.findOne({ where: { id: paymentId } })

    if (!payment) {
        throw new errors.NotFound()
    }

    await payment.destroy()

    return { ok: "PaymentRemoved" }
}
const getPaymentsByCustomerId = async (limit, offset, customer_id) => {
    limit = limit && parseInt(limit, 10)
    offset = offset && parseInt(offset, 10)

    return await db.Payment.findAll({
        limit,
        offset,
        raw: true,
        where: { customer_id: customer_id },
        attributes: [[db.Payment.sequelize.fn('sum', db.Payment.sequelize.col('amount')), 'total_amount']],
        include: [{
            model: db.Rental,
            as: 'rental'
        }]

    })
}

module.exports = {
    createPayment,
    readPayment,
    updatePayment,
    removePayment,
    getPaymentsByCustomerId
}