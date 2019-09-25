const mongoose = require('mongoose')
const attributeBlockSchema = require('./attributeBlock.js').schema
const skillBlockSchema = require('./skillBlock.js').schema
const weaponSchema = require('./weapon.js').schema




const spiritSchema = new mongoose.Schema({
	name: {
		type: String,
  	required: true
	},
	owner: {
		type: String,
  	required: false
	},
	force: {
		type: Number,
		required: false
	},
	powers: {
		type: String,
  	required: false
	},
	attributes: attributeBlockSchema,
	weapons : [weaponSchema],
	skills : skillBlockSchema

});

module.exports = mongoose.model('Spirit', spiritSchema)