const mongoose = require('mongoose')


const WeaponSchema = new mongoose.Schema({
	
		name: {
			type: String,
			required: false
		},
		arClose : {
			type: Number,
			required: false
		},
		arNear : {
			type: Number,
			required: false
		},
		arMedium : {
			type: Number,
			required: false
		},
		arFar : {
			type: Number,
			required: false
		},
		arExtreme : {
			type: Number,
			required: false
		},
		dv : {
			type: Number,
			required: false
		},
		dvType : {
			type: Number,
			required: false
		},
		targeting : {
			type: Number,
			required: false
		},
	
});

module.exports = mongoose.model('Weapon', WeaponSchema)