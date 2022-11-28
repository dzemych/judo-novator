const express = require('express')
const path = require('path')
const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xssClean = require('xss-clean')
const cors = require('cors')
const app = express()
const errorController = require('./controllers/error.controller')
const routes = require('./routes.js')
const imgTemp = require('./routes/tempImg.router')


// 1) SECURITY middlewares
app.use(helmet({
   contentSecurityPolicy: {
      directives: {
         "script-src": ["'self'", "'unsafe-eval'"],
         "default-src": ["'self'"],
         "base-uri": ["'self'"],
         "font-src": ["'self'", "https:", "data:"],
         "form-action": ["'self'"],
         "frame-ancestors": ["'self'"],
         "img-src": ["'self'", "data:"],
         "object-src": ["'none'"],
         "script-src-attr": ["'none'"],
         "style-src": ["'self'", "https:", "'unsafe-inline'"],
         "upgrade-insecure-requests": ''
      }
   }
}))
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
app.use('/img/temp', imgTemp)
app.use('/img', express.static(path.resolve('public/img')))

app.use(errorController)

module.exports = app