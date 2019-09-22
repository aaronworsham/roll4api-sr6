const mongoose = require('mongoose')


const DroneSchema = new mongoose.Schema({
	
		name: {
			type: String,
			required: false
		},
		owner: {
			type: String,
			required: false
		},
		ownerEngineering: {
			type: Number,
			required: false
		},
		ownerLogic: {
			type: Number,
			required: false
		},
		ownerPiloting: {
			type: Number,
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
		handleingMain : {
			type: Number,
			required: false
		},
		handlingSecond : {
			type: Number,
			required: false
		},
		accel : {
			type: Number,
			required: false
		},
		speedInterval : {
			type: Number,
			required: false
		},
		topSpeed : {
			type: Number,
			required: false
		},
		body : {
			type: Number,
			required: false
		},
		armor : {
			type: Number,
			required: false
		},
		pilot : {
			type: Number,
			required: false
		},
		sensor : {
			type: Number,
			required: false
		},


	
});

module.exports = mongoose.model('Drone', DroneSchema)