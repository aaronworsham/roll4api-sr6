const mongoose = require('mongoose')
const weaponSchema = require('./weapon.js').schema


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
		clearsight : {
			type: Number,
			required: false
		},
		electronicWarfare : {
			type: Number,
			required: false
		},
		evasion : {
			type: Number,
			required: false
		},
		maneuvering : {
			type: Number,
			required: false
		},
		stealth : {
			type: Number,
			required: false
		},
		weapons : [weaponSchema],


	
});

module.exports = mongoose.model('Drone', DroneSchema)