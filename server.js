var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const createHttpError = require('http-errors')

const userRouter = require('./routes/userRoute')
const actorRouter = require('./routes/actorRoute')
const filmRouter = require('./routes/filmRoute')
const customerRouter = require('./routes/customerRoute')
const staffRouter = require('./routes/staffRoute')
const storeRouter = require('./routes/storeRoute')
const inventoryRouter = require('./routes/inventoryRoute')


var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user', userRouter)
app.use('/api/actor', actorRouter)
app.use('/api/film', filmRouter)
app.use('/api/customer', customerRouter)
app.use('/api/staff', staffRouter)
app.use('/api/store', storeRouter)
app.use('/api/inventory', inventoryRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createHttpError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
