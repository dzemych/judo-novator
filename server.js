const mongoose = require('mongoose')
const path = require('path')
const dotenv = require('dotenv')
const app = require('./src/app')


dotenv.config({path: path.resolve('config.env')})

const port = process.env.PORT

const dbLocalUrl = process.env.DB_LOCAL_URL
const dbPassword = process.env.DB_PASSWORD

const db = dbLocalUrl.replace('<password>', dbPassword)

const start = async () => {
   try {
      await mongoose.connect(db)
      console.log('DB connection successful')

      app.listen(port)
      console.log(`App is running on port: ${port}`)
   } catch (e) {
      console.log(e)
      process.exit(1)
   }
}

start()