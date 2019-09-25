require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var cors = require('cors')

mongoose.connect(process.env.DATABASE_URL, 
	{ 
		useNewUrlParser: true,
		useFindAndModify: false
	})
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

const npcRouter = require('./routes/npcs')
app.use('/npcs', npcRouter)

const critterRouter = require('./routes/critters')
app.use('/critters', critterRouter)

const encounterRouter = require('./routes/encounters')
app.use('/encounters', encounterRouter)

const droneRouter = require('./routes/drones')
app.use('/drones', droneRouter)

const vehicleRouter = require('./routes/vehicles')
app.use('/vehicles', vehicleRouter)

const spiritRouter = require('./routes/spirits')
app.use('/spirits', spiritRouter)

app.listen(3000, () => console.log('server started'))