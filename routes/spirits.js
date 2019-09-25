const express = require('express')
const router = express.Router()
const Spirit = require('../models/spirit')
const deepExtend = require('deep-extend')
const AttributeBlock = require('../models/attributeBlock')
const SkillBlock = require('../models/skillBlock')
const Weapon = require('../models/weapon')

// GET SPIRITS

router.get('/', async (req, res) => {
  try {
    const spirits = await Spirit.find()
    res.json(spirits)  
  } catch (err) {
  	res.status(500).json({ message: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const spirit = await Spirit.findOne({
      _id: req.params.id 
    })
    res.json(spirit)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})



// CREATE SPIRIT

router.post('/', async (req, res) => {
  var data = getBody(req)

  var doc = {

    name : data.name,
    owner: data.owner,
    force: data.force,
    powers: data.powers,
    icon: null,
    portrait: null,
    attributes : {},
    skills : {}
  }

	const spirit = new Spirit(doc)

  try {
    const newSpirit = await spirit.save()
    res.status(201).json(newSpirit)
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message })
  }
})


//UPDATE SPIRITS

router.put('/:id', async (req, res) =>{
  var update = new Spirit(getBody(req))
  try{
    var spirit = await Spirit.findOne({
      _id: req.params.id
    })
    if(spirit instanceof Spirit == false){
      res.status(404).json({message : "No record found"})
    }
    else{
      spirit.name = update.name
      spirit.owner =  update.owner
      spirit.force = update.force
      spirit.powers = update.powers
      await spirit.save();
      res.status(200).json(spirit)
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }   

})

router.put('/:id/attributes', async (req, res) =>{
  var attributes = new AttributeBlock(getBody(req))
  try{
    var spirit = await Spirit.findOne({
      _id: req.params.id
    })
    if(spirit instanceof Spirit == false){
      res.status(404).json({message : "No record found"})
    }
    else{
      spirit.attributes = attributes
      await spirit.save();
      res.status(200).json(spirit)
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }  

})

router.put('/:id/skills', async (req, res) =>{
  var skills = new SkillBlock(getBody(req))
  try{
    var spirit = await Spirit.findOne({
      _id: req.params.id
    })
    if(spirit instanceof Spirit == false){
      res.status(404).json({message : "No record found"})
    }
    else{
      spirit.skills = skills
      await spirit.save();
      res.status(200).json(spirit)
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }   

})


router.put('/:id/weapons', async (req, res) =>{
  var weapons = getBody(req)
  try{
    for (var i = weapons.length - 1; i >= 0; i--) {
      var weapon = new Weapon(weapons[i])
      var spirit = await Spirit.findOne({
        _id: req.params.id
      })
      if(spirit instanceof Spirit == false){
        res.status(404).json({message : "No Spirit found"})
      }
      else{
        spirit.weapons.push(weapon)
        await spirit.save();
        res.status(200).json(spirit)
      }
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }   

})






//DELETE SPIRITS

router.delete("/:id", async (req, res) =>{

  try{  
    await Spirit.deleteOne({
      _id: req.params.id 
    }) 
    res.status(200).json({message: "ID Deleted"}) 
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }

})

router.delete("/:id/weapon/:weapon_id", async (req, res) =>{

  try{  
    var spirit = await Spirit.findOne({
      _id: req.params.id 
    }) 
    console.log("Weapon Delete")
    spirit.weapons.id(req.params.weapon_id).remove()
    await spirit.save(function (err) {
      if (err) return handleError(err);
      console.log('the subdoc was removed');
      res.status(200).json({message: "Weapon Deleted"}) 
    }) 
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