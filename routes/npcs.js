const express = require('express')
const router = express.Router()
const Npc = require('../models/npc')
const deepExtend = require('deep-extend')
const AttributeBlock = require('../models/attributeBlock')
const SkillBlock = require('../models/skillBlock')
const Weapon = require('../models/weapon')

// GET NPCS

router.get('/', async (req, res) => {
  try {
    const npcs = await Npc.find()
    res.json(npcs)  
  } catch (err) {
  	res.status(500).json({ message: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const npc = await Npc.findOne({
      _id: req.params.id 
    })
    res.json(npc)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})



// CREATE NPC

router.post('/', async (req, res) => {
  var data = getBody(req)

  var doc = {

    name : data.name,
    owner: null,
    icon: null,
    portrait: null,
    attributes : {},
    skills : {},
    tracks : {}
  }

	const npc = new Npc(doc)

  try {
    const newNpc = await npc.save()
    res.status(201).json(newNpc)
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message })
  }
})


//UPDATE NPCS

router.put('/:id', async (req, res) =>{
  var update = new Npc(getBody(req))
  try{
    var npc = await Npc.findOne({
      _id: req.params.id
    })
    if(npc instanceof Npc == false){
      res.status(404).json({message : "No record found"})
    }
    else{
      npc.name = update.name
      await npc.save();
      res.status(200).json(npc)
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
    var npc = await Npc.findOne({
      _id: req.params.id
    })
    if(npc instanceof Npc == false){
      res.status(404).json({message : "No record found"})
    }
    else{
      npc.attributes = attributes
      await npc.save();
      res.status(200).json(npc)
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
    var npc = await Npc.findOne({
      _id: req.params.id
    })
    if(npc instanceof Npc == false){
      res.status(404).json({message : "No record found"})
    }
    else{
      npc.skills = skills
      await npc.save();
      res.status(200).json(npc)
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
      var npc = await Npc.findOne({
        _id: req.params.id
      })
      if(npc instanceof Npc == false){
        res.status(404).json({message : "No Npc found"})
      }
      else{
        npc.weapons.push(weapon)
        await npc.save();
        res.status(200).json(npc)
      }
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }   

})






//DELETE NPCS

router.delete("/:id", async (req, res) =>{

  try{  
    await Npc.deleteOne({
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
    var npc = await Npc.findOne({
      _id: req.params.id 
    }) 
    console.log("Weapon Delete")
    npc.weapons.id(req.params.weapon_id).remove()
    await npc.save(function (err) {
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