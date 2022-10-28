const express = require('express')
const path = require('path')
const errorController = require('./controllers/error.controller')
const routes = require('./routes.js')
const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xssClean = require('xss-clean')
const cors = require('cors')


const app = express()

// 1) SECURITY middlewares
app.use(helmet())
app.use(mongoSanitize())
app.use(xssClean())

app.use(rateLimiter({
   max: 500,
   windowMs: 60 * 500,
   message: 'To many requests from this IP'
}))

// * Cors
app.use(cors())

// 2) PARSING middlewares
app.use(express.json())

// 3) Routes
app.use('/api', routes)
app.use('/img', express.static(path.resolve('public/img')))

app.use(errorController)

module.exports = app