const mongoose = require('mongoose')
const attributeBlockSchema = require('./attributeBlock.js').schema
const skillBlockSchema = require('./skillBlock.js').schema
const trackBlockSchema = require('./trackBlock.js').schema
const weaponSchema = require('./weapon.js').schema
const armorSchema = require('./armor.js').schema




const otherSchema = new mongoose.Schema({
	name: {
		type: String,
  	required: true
	},
	attributes: attributeBlockSchema,
	skills : skillBlockSchema,
	tracks : trackBlockSchema,
	weapons : [weaponSchema],
	armor: [armorSchema]
	

});

module.exports = mongoose.model('Other', otherSchema)