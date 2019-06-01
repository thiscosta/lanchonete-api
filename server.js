const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const requireDir = require('require-dir')
const Offers = require('./src/models/offer')

require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true } )

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

requireDir('./src/models')

// Offers.create({ name: 'Light', description: 'Se o lanche tem alface e não tem bacon, ganha 10% de desconto' })
// Offers.create({ name: 'Muita carne', description: 'A cada 3 porções de carne o cliente só paga 2' })
// Offers.create({ name: 'Muito queijo', description: 'A cada 3 porções de queijo o cliente só paga 2' })

app.use('/', require('./src/routes/router'))

app.listen(process.env.PORT)