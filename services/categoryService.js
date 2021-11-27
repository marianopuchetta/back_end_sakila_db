const db = require('../models')
const error = require('../errors/errors')
const { Op } = require('sequelize')
const { parseInt } = require('lodash')

const createCategory = async (categoryName, userId) => {
    const newCategory = { categoryName }
    console.log('s')
    return await db.Category.create(newCategory)
}

const readCategory = async(limit,offset) => {
    limit = limit && parseInt(limit,10)
    offset = offset && parseInt(offset,10)

    return await db.Category.findAll({limit,offset})
}

const updateCategory = async (categoryName,categoryId,userId) => {
    let category = await db.Category.findOne({where:{id:categoryId}})
console.log(category)
    if(!category){
        throw new errors.NotFound()
    }

    category.categoryName = categoryName ? categoryName : category.categoryName
    await category.save()
    await category.reload()
    return category.toJSON()
}

const removeCategory = async (categoryId) => {
    let category = await db.Category.findOne({where : {id : categoryId}})

    if(!category){
        throw new errors.NotFound()
    }

    await category.destroy()

    return{ok:'CategoryRemoved'}
}

module.exports = {
    createCategory,
    readCategory,
    updateCategory,
    removeCategory
}