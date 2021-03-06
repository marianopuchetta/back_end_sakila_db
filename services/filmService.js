const db = require('../models')
const errors = require('../errors/errors')
const { Op } = require('sequelize')

const createFilm = async (title, description, release_year,
    language_id, original_language_id,
    rental_duration, rental_rate, length,
    replacement_cost, rating, special_features) => {
    const newFilm = {
        title, description, release_year,
        language_id, original_language_id,
        rental_duration, rental_rate, length,
        replacement_cost, rating, special_features
    }
    console.log(newFilm)
    return await db.Film.create(newFilm)
}

/**
 * 
 * @param {*} limit 
 * @param {*} offset 
 * @returns select f.id,f.title,f.description,f.release_year,f.length,f.rating,f.special_features,l.name as language,c.categoryName as category from film f
            join film_categories fc on fc.film_id = f.id
            join categories c on fc.category_id = c.id
            join languages l on l.language_id = f.language_id
            order by f.id ASC
 */
const readFilm = async (limit, offset) => {
    limit = limit && parseInt(limit, 10)
    offset = offset  && parseInt(offset * limit, 10)
     
    return await db.Film_category.findAll({
        limit, offset,
        attributes: [],
        raw: true,
        include: [{
            model: db.Film,
            attributes: ['id', 'title', 'description', 'release_year', 'length', 'rating', 'special_features'],
            as: 'film',
            include:{
                model: db.Language,
                as:'language',
                attributes:['name']
            }
        },
        {
            model: db.Category,
            as: 'category',
            attributes: [['categoryName', 'category']]
        }
        ],
        order: [[db.Film.sequelize.col('film_id'), 'ASC']],
    })
}

const updateFilm = async (title, description, release_year,
    language_id, original_language_id,
    rental_duration, rental_rate, length,
    replacement_cost, rating, special_features, filmId, userId) => {

    let film = await db.Film.findOne({ where: { id: filmId } })

    if (!film) {
        throw new errors.NotFound()
    }
    film.title = title ? title : film.title
    film.description = description ? description : film.description
    film.release_year = release_year ? release_year : film.release_year
    film.language_id = language_id ? language_id : film.language_id
    film.original_language_id = original_language_id ? original_language_id : film.original_language_id
    film.rental_duration = rental_duration ? rental_duration : film.rental_duration
    film.rental_rate = rental_rate ? rental_rate : film.rental_rate
    film.length = length ? length : film.length
    film.replacement_cost = replacement_cost ? replacement_cost : film.replacement_cost
    film.rating = rating ? rating : film.rating
    film.special_features = special_features ? special_features : film.special_features

    await film.save()
    await film.reload()
    return film.toJSON()
}

const removeFilm = async (filmId) => {
    let filmToRemove = await db.Film.findOne({ where: { id: filmId } })

    if (!filmToRemove) {
        throw new errors.NotFound()
    }


    await filmToRemove.destroy()

    return { ok: "FilmRemoved" }
}

/**
 * @param {*} limit 
 * @param {*} offset 
 * @param {*} title 
 * @returns list of actors from the movie(title)
 */
const actorsFromFilm = async (limit, offset, title) => {
    let film = await db.Film.findAll({ where: { title: title } })
    if (!film) {
        throw new errors.NotFound()
    }

    let { id } = film[0]
    let actors = await db.Film_actor.findAll({
        where: { film_id: id },
        attributes: [],
        include: {
            model: db.Actor,
            as: 'actor',
            attributes: ['first_name', 'last_name']
        }
    })
    return actors
}

const filmsActor = async (limit, offset, first_name, last_name) => {
    let actor = await db.Actor.findOne({ where: { [Op.and]: [{ first_name: first_name }, { last_name: last_name }] }, })
    if (!actor) {
        throw new errors.NotFound()
    }
    let { id } = actor
    let films = await db.Film_actor.findAll({
        where: { actor_id: id },
        attributes: [],
        include: {
            model: db.Film,
            as: 'film',
            attributes: ['title']
        }
    })
    return films
}

const allFilmsRentedById = async (id) => {
    console.log(id)
    let films_rented = await db.Rental.findAll({
        where: { customer_id: id },
        attributes: ['rental_date'],
        raw: true,
        include: [{
            model: db.Inventory,
            as: 'inventory',
            attributes: [],
            include: {
                model: db.Film,
                as: 'film',
                attributes: ['title']
            }
        }
        ]
    })
    return films_rented
}

const allFilmsByCategory = async (limit,offset,category) => {
    limit = limit && parseInt(limit, 10)
    offset = offset  && parseInt(offset * limit, 10)

    let categoryToSearch = await db.Category.findOne({
        where:{categoryName : category}
    })
    if(!categoryToSearch){
        throw new errors.NotFound()
    }
    let {id} = categoryToSearch
    let filmsByCategory = await db.Film_category.findAll({
        limit,offset,
        where:{category_id : id},
        attributes:[],
        include:{
            model : db.Film,
            as : 'film'
        }
    })
return filmsByCategory
}
module.exports = {
    createFilm,
    readFilm,
    updateFilm,
    removeFilm,
    actorsFromFilm,
    filmsActor,
    allFilmsRentedById,
    allFilmsByCategory
}