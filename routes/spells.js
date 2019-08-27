const express = require('express')
const router = express.Router()
const Spell = require('../models/spell')
const deepExtend = require('deep-extend')

// GET SPELLS

router.get('/', async (req, res) => {
  try {
    const spells = await Spell.find()
    res.json(spells)  
  } catch (err) {
  	res.status(500).json({ message: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const spell = await Spell.findOne({
      _id: req.params.id 
    })
    res.json(spell)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})



// CREATE SPELL

router.post('/', async (req, res) => {
  var data = getBody(req)

	const spell = new Spell(data)

  try {
    const newSpell = await spell.save()
    res.status(201).json(newSpell)
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message })
  }
})


//UPDATE SPELLS

router.put('/:id', async (req, res) =>{
  var update = new Spell(getBody(req))
  try{
    var spell = await Spell.updateOne({
      _id: req.params.id
    }, update)
    res.status(200).json(spell)
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }   

})




//DELETE SPELLS

router.delete("/:id", async (req, res) =>{

  try{  
    await Spell.deleteOne({
      _id: req.params.id 
    }) 
    res.status(200).json({message: "ID Deleted"}) 
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }

})





function getBody(req){
  if( req.body.body != null){
    return req.body.body
  }
  else {
    return req.body
  }
}
module.exports = router