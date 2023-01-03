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


// 1) SECURITY middlewares
app.use(helmet({
   crossOriginResourcePolicy: false,
   contentSecurityPolicy    : {
      directives: {
         "script-src"               : ["'self'", "'unsafe-eval'"],
         "default-src"              : ["'self'"],
         "base-uri"                 : ["'self'"],
         "font-src"                 : ["'self'", "https:", "data:"],
         "form-action"              : ["'self'"],
         "frame-ancestors"          : ["'self'"],
         "img-src"                  : ["'self'", "data:", "http://localhost"],
         "object-src"               : ["'none'"],
         "script-src-attr"          : ["'none'"],
         "style-src"                : ["'self'", "https:", "'unsafe-inline'"],
         "upgrade-insecure-requests": '',
      }
   }
}))
app.use(mongoSanitize())
app.use(xssClean())

app.use(rateLimiter({
   max     : 500,
   windowMs: 60 * 500,
   message : 'To many requests from this IP'
}))

// * Cors
app.use(cors())

// 2) PARSING middlewares
app.use(express.json())

function sleep(ms) {
   return new Promise((resolve) => {
      setTimeout(resolve, ms);
   })
}

app.use(async (req, res, next) => {
   await sleep(500)
   next()
})

// 3) Routes
app.use('/api', routes)
app.use('/img', express.static(path.resolve('public/img')))

app.use(errorController)

module.exports = app