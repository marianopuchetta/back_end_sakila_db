const cityService = require('../services/cityService')

const create = async (req, res) => {
    const { city, country_id } = req.body
    const { userId } = req.user
    let code = 201
    let resContent = {}

    try {
        resContent = await cityService.createCity(
            city, country_id
        )
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
    let resContent = {}

    try {
        resContent = await cityService.readCity(limit, offset)
    } catch (error) {
        console.log(error)
        code = error.statusCode || 500
        resContent = { error: error.errorMessage }
    }
    res.status(code).json(resContent)
}
const update = async (req, res) => {
    const { city, country_id} = req.body
    const { id: city_id } = req.params
    const { userId } = req.user

    let code = 200
    let resContent = {}

    try {
        resContent = await cityService.updateCity(city,country_id,city_id)
    } catch (error) {
        code= error.statusCode || 500
        resContent = {error: error.errorMessage}
    }
    res.status(code).json(resContent)
}

const remove = async (req,res) => {
    const{id: city_id} = req.params
    let code = 200
    let resContent = {}

    try {
        resContent = await cityService.removeCity(city_id)
    } catch (error) {
      code = error.statusCode || 500
      resContent = { error : error.errorMessage}  
    }
    res.status(code).json(resContent)
}

module.exports = {
    create,
    read,
    update,
    remove
}