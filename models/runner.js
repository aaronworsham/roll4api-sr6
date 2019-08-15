const mongoose = require('mongoose')
const attributeBlockSchema = require('./attributeBlock.js').schema
const skillBlockSchema = require('./skillBlock.js').schema
const trackBlockSchema = require('./trackBlock.js').schema




const runnerSchema = new mongoose.Schema({
	name: {
		type: String,
  	required: true
	},
	owner: {
		type: String,
		required: false
	},
	icon: {
		type: String,
		required: false
	},
	portrait: {
		type: String,
		required: false
	},
	attributes: attributeBlockSchema,
	skills : skillBlockSchema,
	tracks : trackBlockSchema
	

});

module.exports = mongoose.model('Runner', runnerSchema)