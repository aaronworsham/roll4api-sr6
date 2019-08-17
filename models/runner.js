const mongoose = require('mongoose')
const attributeBlockSchema = require('./attributeBlock.js').schema
const skillBlockSchema = require('./skillBlock.js').schema
const trackBlockSchema = require('./trackBlock.js').schema
const weaponSchema = require('./weapon.js').schema




const runnerSchema = new mongoose.Schema({
	name: {
		type: String,
  	required: true
	},
	attributes: attributeBlockSchema,
	skills : skillBlockSchema,
	tracks : trackBlockSchema,
	weapons : [weaponSchema]
	

});

module.exports = mongoose.model('Runner', runnerSchema)