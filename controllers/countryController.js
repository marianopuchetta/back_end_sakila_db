const countryService = require('../services/countryService')

const create = async (req,res) => {
    const {country} = req.body
    const{userId} = req.user
    let code = 201
    let resContent = {}
    try{
        resContent = await countryService.createCountry(country,userId)
    } catch(error) {
        console.log(error)
        code = error.statusCode || 500
        resContent = {error:error.errorMessage}
    }
    res.status(code).json(resContent)

}

const read = async (req,res) => {
    const {limit,offset} = req.query
    let code = 200
    let resContent = {}
    try {
        resContent = await countryService.readCountry(limit,offset)
    } catch (error) {
        console.log(error)
        code = error.statusCode || 500
        resContent = { error : error.errorMessage}
    }
    res.status(code).json(resContent)
}

const update = async (req,res) => {
    const {country} = req.body
    const {id: countryId} = req.params
    const {userId} = req.user

    let code = 200
    let resContent = {}

    try {
        resContent = await countryService.updateCountry(country,countryId)
    } catch (error) {
      code = error.statusCode || 500
      resContent = {error:error.errorMessage}  
    }
    res.status(code).json(resContent)
}

const remove = async (req,res) => {
    const{id:countryId} = req.params
    let code = 200
    let resContent = {}

    try {
        resContent = await countryService.removeCountry(countryId)
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