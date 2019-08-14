const mongoose = require('mongoose')


const SkillBlockSchema = new mongoose.Schema({
		astral: {
			type: Number,
			required: false
		},
	  athletics: {
			type: Number,
			required: false
		}, 
	  biotech: {
			type: Number,
			required: false
		},
	  closeCombat: {
			type: Number,
			required: false
		},
	  con: {
			type: Number,
			required: false
		},
	  conjuring: {
			type: Number,
			required: false
		},
	  cracking: {
			type: Number,
			required: false
		},
	  electronics: {
			type: Number,
			required: false
		},
	  enchanting: {
			type: Number,
			required: false
		},
	  engineering: {
			type: Number,
			required: false
		},
	  exoticWeapons: {
			type: Number,
			required: false
		},
	  firearms: {
			type: Number,
			required: false
		},
	  influence: {
			type: Number,
			required: false
		},
	  outdoors: {
			type: Number,
			required: false
		},
	  perception: {
			type: Number,
			required: false
		},
	  piloting: {
			type: Number,
			required: false
		},
	  sorcery: {
			type: Number,
			required: false
		},
	  stealth: {
			type: Number,
			required: false
		},
	  tasking: {
			type: Number,
			required: false
		}

});

module.exports = mongoose.model('SkillBlock', SkillBlockSchema)