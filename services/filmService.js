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


const readFilm = async (limit, offset) => {
    limit = limit && parseInt(limit, 10)
    offset = limit && parseInt(offset, 10)

    return await db.Film.findAll({ limit, offset })
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
        attributes:[],
        include: {
            model: db.Film,
            as: 'film',
            attributes:['title']
        }
    })
    return films
}
module.exports = {
    createFilm,
    readFilm,
    updateFilm,
    removeFilm,
    actorsFromFilm,
    filmsActor
}