const mongoose = require('mongoose')


const WeaponSchema = new mongoose.Schema({
	
		name: {
			type: String,
			required: false
		},
		arClose : {
			type: String,
			required: false
		},
		arNear : {
			type: String,
			required: false
		},
		arMedium : {
			type: String,
			required: false
		},
		arFar : {
			type: String,
			required: false
		},
		arExtreme : {
			type: String,
			required: false
		},
		dv : {
			type: String,
			required: false
		},
		dvType : {
			type: String,
			required: false
		}
	
});

module.exports = mongoose.model('Weapon', WeaponSchema)