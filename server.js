const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const requireDir = require('require-dir')

require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true } )

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

requireDir('./src/models')

app.use('/', require('./src/routes/router'))

app.listen(process.env.PORT)