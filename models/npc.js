const mongoose = require('mongoose')
const attributeBlockSchema = require('./attributeBlock.js').schema
const skillBlockSchema = require('./skillBlock.js').schema
const weaponSchema = require('./weapon.js').schema




const npcSchema = new mongoose.Schema({
	name: {
		type: String,
  	required: true
	},
	attributes: attributeBlockSchema,
	skills : skillBlockSchema,
	weapons : [weaponSchema],
	

});

module.exports = mongoose.model('Npc', npcSchema)