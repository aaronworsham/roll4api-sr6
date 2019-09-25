const mongoose = require('mongoose')
const attributeBlockSchema = require('./attributeBlock.js').schema
const skillBlockSchema = require('./skillBlock.js').schema
const powerSchema = require('./power.js').schema




const critterSchema = new mongoose.Schema({
	name: {
		type: String,
  	required: true
	},
	attributes: attributeBlockSchema,
	skills : skillBlockSchema,
	powers : [powerSchema]
	

});

module.exports = mongoose.model('Critter', critterSchema)