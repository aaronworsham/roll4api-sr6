const mongoose = require('mongoose')


const trackBlockSchema = new mongoose.Schema({
		physicalTrack: {
			type: Number,
			required: false
		},
		stunTrack: {
			type:Number,
			required: false
		}
	

});

module.exports = mongoose.model('TrackBlock', trackBlockSchema)