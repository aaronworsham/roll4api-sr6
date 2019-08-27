const mongoose = require('mongoose')


const VehicleSchema = new mongoose.Schema({
	
		name: {
			type: String,
			required: false
		},
		dr : {
			type: Number,
			required: false
		}
	
});

module.exports = mongoose.model('Vehicle', VehicleSchema)