const filmService = require('../services/filmService')

const create = async (req, res) => {
  const { title, description, release_year,
    language_id, original_language_id,
    rental_duration, rental_rate, length,
    replacement_cost, rating, special_features } = req.body
  const { userId } = req.user
  let code = 201
  let resContent = {}

  try {
    resContent = await filmService.createFilm(
      title, description, release_year,
      language_id, original_language_id,
      rental_duration, rental_rate, length,
      replacement_cost, rating, special_features, userId)
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
  let content = {}
  try {
    content = await filmService.readFilm(limit, offset)
  } catch (error) {
    console.log(error)
    code = error.statusCode || 500
    content = { error: error.errorMessage }
  }

  res.status(code).json(content)
}

const update = async (req, res) => {
  const { title, description, release_year,
    language_id, original_language_id,
    rental_duration, rental_rate, length,
    replacement_cost, rating, special_features } = req.body
  const { id: filmId } = req.params
  const { userId } = req.user

  let code = 200
  let resContent = {}

  try {
    resContent = await filmService.updateFilm(title, description, release_year,
      language_id, original_language_id,
      rental_duration, rental_rate, length,
      replacement_cost, rating, special_features, filmId, userId)
  } catch (error) {
    code = error.statusCode || 500
    resContent = { error: error.errorMessage }
  }
  res.status(code).json(resContent)
}

const remove = async (req, res) => {
  const { id: filmId } = req.params
  let code = 200
  let content = {}

  try {
    content = await filmService.removeFilm(filmId)
  } catch (error) {
    console.log(error)
    code = error.statusCode || 500
    content = { error: error.errorMessage }
  }

  res.status(code).json(content)
}
const getAllActorsFromFilm = async (req, res) => {
  const { limit, offset } = req.query
  const { title } = req.body
  let code = 200
  let content = {}
  try {
    content = await filmService.actorsFromFilm(limit, offset, title)
  } catch (error) {
    console.log(error)
    code = error.statusCode || 500
    content = { error: error.errorMessage }
  }

  res.status(code).json(content)
}

const getAllMoviesActor = async (req, res) => {
  const { limit, offset } = req.query
  const { first_name, last_name } = req.body
  let code = 200
  let content = {}

  try {
    content = await filmService.filmsActor(limit, offset, first_name, last_name)
  } catch (error) {
    console.log(error)
    code = error.statusCode || 500
    content = { error: error.errorMessage }
  }
  res.status(code).json(content)
}
const getAllFilmsRentedById = async (req, res) => {
  const {id } = req.params
  console.log(req.params)

  let code = 200
  let content = {}

  try {
    content = await filmService.allFilmsRentedById(id)
  } catch (error) {
    console.log(error)
    code = error.statusCode || 500
    content = { error: error.errorMessage }
  }
  res.status(code).json(content)

}

const getAllFilmsByCategory = async (req,res) => {
  const {limit,offset} = req.query;
  const {category} = req.body;
  let code = 200;
  let resContent = {}

  try {
    resContent = await filmService.allFilmsByCategory(limit,offset,category)
  } catch (error) {
    console.log(error)
    code = error.statusCode || 500
    resContent = {error : error.errorMessage}
  }
  res.status(code).json(resContent)
}

module.exports = {
  create,
  read,
  update,
  remove,
  getAllActorsFromFilm,
  getAllMoviesActor,
  getAllFilmsRentedById,
  getAllFilmsByCategory
}
