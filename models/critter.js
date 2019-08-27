const mongoose = require('mongoose')
const attributeBlockSchema = require('./attributeBlock.js').schema
const skillBlockSchema = require('./skillBlock.js').schema
const trackBlockSchema = require('./trackBlock.js').schema
const powerSchema = require('./power.js').schema
const armorSchema = require('./armor.js').schema




const critterSchema = new mongoose.Schema({
	name: {
		type: String,
  	required: true
	},
	attributes: attributeBlockSchema,
	skills : skillBlockSchema,
	tracks : trackBlockSchema,
	armor: [armorSchema],
	powers : [powerSchema]
	

});

module.exports = mongoose.model('Critter', critterSchema)