const mongoose = require('mongoose')


const AttributeBlockSchema = new mongoose.Schema({
	
		body: {
			type: Number,
			required: false
		},
	  agility: {
			type: Number,
			required: false
		},
	  reaction: {
			type: Number,
			required: false
		},
	  strength: {
			type: Number,
			required: false
		},
	  willpower: {
			type: Number,
			required: false
		},
	  logic: {
			type: Number,
			required: false
		},
	  intuition: {
			type: Number,
			required: false
		},
	  charisma: {
			type: Number,
			required: false
		},
	  edge: {
			type: Number,
			required: false
		},
	  magic: {
			type: Number,
			required: false
		},
	  resonance: {
			type: Number,
			required: false
		},
	  essance: {
			type: Number,
			required: false
		},
		defenseRating: {
			type: Number,
			required: false
		},
		initDie: {
			type: Number,
			required: false
		}
	
});

module.exports = mongoose.model('AttributeBlock', AttributeBlockSchema)