const db = require('../models')
const errors = require('../errors/errors')
const { Op } = require('sequelize')

const createCity = async (city, country_id) => {
    const newCity = {
        city, country_id
    }
    console.log(country_id)
    return await db.City.create(newCity)
}

const readCity = async (limit, offset) => {
    limit = limit && parseInt(limit, 10)
    offset = offset && parseInt(offset * limit, 10)

    return await db.City.findAll({
        limit, offset,
        include: {
            model: db.Country,
            as: 'country',
            attributes: ['name']
        }
    })
}

const updateCity = async (city, country_id,city_id) => {
    let cityToUpdate = await db.City.findOne({ where: { id: city_id } })
    if (!cityToUpdate) {
        throw new errors.NotFound()
    }
    cityToUpdate.city = city ? city : cityToUpdate.city
    cityToUpdate.country_id = country_id ? country_id : cityToUpdate.country_id

    await cityToUpdate.save()
    await cityToUpdate.reload()

    return cityToUpdate.toJSON()
}

const removeCity = async (country_id) => {
    let cityToRemove = await db.City.findOne({ where: { id: country_id } })
    if (!cityToRemove) {
        throw new errors.NotFound()
    }
    await cityToRemove.destroy()

    return {ok: "CityRemoved"}

}

module.exports = {
    createCity,
    readCity,
    updateCity,
    removeCity
}