const categoryService = require('../services/categoryService')


const create = async (req, res) => {
    const { categoryName } = req.body
    const { userId } = req.user
    let code = 201
    let resContent = {}

    try {
        resContent = await categoryService.createCategory(categoryName, userId)
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
        resContent = await categoryService.readCategory(limit, offset)
    } catch (error) {
        console.log(error)
        code = error.statusCode || 500
        resContent = { error: error.errorMessage }
    }
    res.status(code).json(resContent)
}

const update = async(req,res) => {
    const{categoryName}= req.body
    const{id: categoryId} = req.params
    const{userId} = req.user

    let code = 200
    let resContent ={}
    try {
        resContent = await categoryService.updateCategory(categoryName,categoryId,userId)
    } catch (error) {
        code = error.statusCode || 500
        resContent = {error: error.errorMessage}
    }
    res.status(code).json(resContent)
}

const remove = async (req,res) => {
    const {id : categoryId} = req.params
    let code = 200
    let resContent = {}

    try{
        resContent = await categoryService.removeCategory(categoryId)
    }catch(error){
        code = error.statusCode || 500
        resContent = {error: error.errorMessage}
    }
    res.status(code).json(resContent)
}


module.exports = {
    create,
    read,
    update,
    remove
}