const mongoose = require('mongoose')


const SpellSchema = new mongoose.Schema({
	
		name: {
			type: String,
			required: false
		},
		range : {
			type: String,
			required: false
		},
		type : {
			type: String,
			required: false
		},
		duration : {
			type: String,
			required: false
		},
		dv : {
			type: Number,
			required: false
		},
		damage : {
			type: Number,
			required: false
		},
		damageSpecial : {
			type: String,
			required: false
		},
		direction: {
			type: String,
			required: false
		}
	
});

module.exports = mongoose.model('Spell', SpellSchema)