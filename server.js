require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

app.use(bodyParser.urlencoded({
  extended: true
}));

const userRouter = require('./routes/users')
app.use('/users', userRouter)

app.listen(3000, () => console.log('server started'))