const express = require('express')
const morgan = require('morgan')
const colors = require('colors')
const cors = require('cors')
const dotenv = require('dotenv')
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2

const imageRouter = require('./route/image')

//load env var
dotenv.config({
  path: './config/config.env',
})

const app = express()
app.use(cors())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

app.use(
  fileUpload({
    useTempFiles: true,
    // tempFilesDir: '/tmp/',
  })
)
app.get((req, res) => {
  res.status(200).json({ status: 'success', message: 'Home' })
})
app.use('/api/v1/image', imageRouter)

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold
  )
)
