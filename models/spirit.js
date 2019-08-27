const mongoose = require('mongoose')


const SpiritSchema = new mongoose.Schema({
	
		name: {
			type: String,
			required: false
		},
		dr : {
			type: Number,
			required: false
		}
	
});

module.exports = mongoose.model('Spirit', SpiritSchema)