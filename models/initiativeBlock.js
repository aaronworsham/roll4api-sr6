const mongoose = require('mongoose')


const initBlockSchema = new mongoose.Schema({
		physicalTrack: {
			type: Number,
			required: false
		},
		stunTrack: {
			type:Number,
			required: false
		}
	

});

module.exports = mongoose.model('InitBlock', initBlockSchema)