const mongoose = require('mongoose')
const path = require('path')
const dotenv = require('dotenv')
const expressApp = require('./src/app')
const next = require('next')
const express = require('express')


dotenv.config({path: path.resolve('config.env')})

const PORT = process.env.PORT
const dev = process.env.NODE_ENV !== 'production'

const dbLocalUrl = process.env.DB_LOCAL_URL
const dbPassword = process.env.DB_PASSWORD

const db = dbLocalUrl.replace('<password>', dbPassword)

const nextApp = next({ dev, port: PORT, dir: '../' })
const handler = nextApp.getRequestHandler()

nextApp.prepare()
   .then(async () => {
      await mongoose.connect(db)
      console.log('DB connection successful')

      expressApp.get('*', (req, res) => {
         return handler(req, res)
      })

      expressApp.listen(PORT, (err) => {
         if (err) throw err
         console.log(`Server running on port ${PORT}`)
      })
   })
   .catch((ex) => {
      console.error(ex.stack)
      process.exit(1)
   })