const router = require('express').Router()
const filmService = require('../controllers/filmController')
const requireLogin = require('../middleware/requirelogin')


router.post(
  '/',
  requireLogin,
  filmService.create
)
router.get(
  '/',
  requireLogin,
  filmService.read
)
router.put(
  '/:id',
  requireLogin,
  filmService.update
)
router.delete(
  '/:id',
  requireLogin,
  filmService.remove
)
router.get(
  '/allactorsfromfilm',
  requireLogin,
  filmService.getAllActorsFromFilm
)
router.get('/allmoviesactor',
  requireLogin,
  filmService.getAllMoviesActor)

router.get('/allfilmsrented/:id',
  requireLogin,
  filmService.getAllFilmsRentedById)



module.exports = router