const mongoose = require('mongoose')


const SpriteSchema = new mongoose.Schema({
	
		name: {
			type: String,
			required: false
		},
		dr : {
			type: Number,
			required: false
		}
	
});

module.exports = mongoose.model('Armor', SpriteSchema)