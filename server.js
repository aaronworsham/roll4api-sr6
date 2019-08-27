require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var cors = require('cors')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(cors())

app.use(express.json())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

const userRouter = require('./routes/users')
app.use('/users', userRouter)

const runnerRouter = require('./routes/runners')
app.use('/runners', runnerRouter)

const otherRouter = require('./routes/others')
app.use('/others', otherRouter)

const spellRouter = require('./routes/spells')
app.use('/spells', spellRouter)

const critterRouter = require('./routes/critters')
app.use('/critters', critterRouter)

app.listen(3000, () => console.log('server started'))