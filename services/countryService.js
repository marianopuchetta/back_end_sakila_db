const db = require('../models')
const errors = require('../errors/errors')

const createCountry = async (name) => {
    const newFilm = {
        name
    }
    console.log(newFilm)
    return await db.Country.create(newFilm)
}

const readCountry = async (limit, offset) => {
    limit = limit && parseInt(limit, 10)
    offset = offset && parseInt(offset * limit, 10)

    return await db.Country.findAll({ limit, offset })
}

const updateCountry = async (name, countryId) => {
    let countryToUpdate = await db.Country.findOne({
        where: { id: countryId }
    })
    if (!countryToUpdate) {
        throw new errors.NotFound()
    }

    countryToUpdate.name = name ? name : countryToUpdate.name
    console.log(countryToUpdate)
    await countryToUpdate.save()
    await countryToUpdate.reload()
    return countryToUpdate.toJSON()
}

const removeCountry = async (countryId) => {
    let country = await db.Country.findOne({
        where: { id: countryId }
    })
    if (!country) {
        throw new errors.NotFound()
    }

    await country.destroy()
    return {ok: "CountryRemoved"}
}
module.exports = {
    createCountry,
    readCountry,
    updateCountry,
    removeCountry
}