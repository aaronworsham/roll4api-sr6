const mongoose = require('mongoose')


const PowerSchema = new mongoose.Schema({
	
		name: {
			type: String,
			required: false
		},
		dr : {
			type: Number,
			required: false
		}
	
});

module.exports = mongoose.model('Power', PowerSchema)