const mongoose = require('mongoose')


const spriteSchema = new mongoose.Schema({
	name: {
		type: String,
  	required: true
	},
	onwer: {
		type: String,
  	required: false
	},
	attack: {
		type: Number,
		required: false
	},
	sleeze: {
		type: Number,
  	required: false
	},
	dataProcessing: {
		type: Number,
  	required: false
	},
	firewall: {
		type: Number,
  	required: false
	},
	initDie: {
			type: Number,
			required: false
	},
	resonance: {
			type: Number,
			required: false
	},
	skills: {
		type: String,
		required: false
	}


});

module.exports = mongoose.model('Sprite', spriteSchema)