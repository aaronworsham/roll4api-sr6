const mongoose = require('mongoose')
const runnerSchema = require('./runner.js').schema
const otherSchema = require('./runner.js').schema
const npcSchema = require('./npc.js').schema
const droneSchema = require('./drone.js').schema
const critterSchema = require('./critter.js').schema
const spiritSchema = require('./spirit.js').schema
const spriteSchema = require('./sprite.js').schema

const encounterSchema = new mongoose.Schema({
	name: {
		type: String,
  	required: true
	},
	runners : [runnerSchema],
	npcs: [npcSchema],
	drones: [droneSchema],
	critters: [critterSchema],
	spirits: [spiritSchema],
	sprites: [spriteSchema]
});

module.exports = mongoose.model('Encounter', encounterSchema)