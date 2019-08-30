const express = require('express')
const router = express.Router()
const deepExtend = require('deep-extend')

const Encounter = require('../models/encounter.js')
const Runner = require('../models/runner.js')
const Npc = require('../models/npc.js')
const Drone = require('../models/drone.js')
const Critter = require('../models/critter.js')
const Spirit = require('../models/spirit.js')
const Sprite = require('../models/sprite.js')

// GET NPCS

router.get('/', async (req, res) => {
  try {
    const encounters = await Encounter.find()
    res.json(encounters)  
  } catch (err) {
  	res.status(500).json({ message: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const encounter = await Encounter.findOne({
      _id: req.params.id 
    })
    res.json(encounter)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})



// CREATE ENCOUNTER

router.post('/', async (req, res) => {
  var data = getBody(req)
  console.log(data)

  var doc = {
    name : data.name
  }

	const encounter = new Encounter(doc)

  try {
    const newEncounter = await encounter.save()
    res.status(201).json(newEncounter)
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message })
  }
})




//UPDATE ENCOUNTER

router.put('/:id', async (req, res) =>{
  var update = new Encounter(getBody(req))
  try{
    var encounter = await Encounter.updateOne({
      _id: req.params.id
    }, update)
    res.status(200).json(encounter)
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }   

})


//ADD RUNNER

router.put('/:id/add-runner', async (req, res) =>{
  var runner = new Runner(getBody(req))
  try{
    var encounter = await Encounter.findOne({
      _id: req.params.id
    })
    if(encounter instanceof Encounter == false){
      res.status(404).json({message : "No record found"})
    }
    else{
      encounter.runners.push(runner)
      await encounter.save();
      res.status(200).json(encounter)
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  } 
 }) 

//ADD NPC

router.put('/:id/add-npc', async (req, res) =>{
  var npc = new Npc(getBody(req))
  try{
    var encounter = await Encounter.findOne({
      _id: req.params.id
    })
    if(encounter instanceof Encounter == false){
      res.status(404).json({message : "No record found"})
    }
    else{
      encounter.npcs.push(npc)
      await encounter.save();
      res.status(200).json(encounter)
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  } 
 }) 

//ADD DRONE

router.put('/:id/add-drone', async (req, res) =>{
  var drone = new Drone(getBody(req))
  try{
    var encounter = await Encounter.findOne({
      _id: req.params.id
    })
    if(encounter instanceof Encounter == false){
      res.status(404).json({message : "No record found"})
    }
    else{
      encounter.drones.push(drone)
      await encounter.save();
      res.status(200).json(encounter)
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  } 
 }) 

//ADD SPRITE

router.put('/:id/add-sprite', async (req, res) =>{
  var sprite = new Sprite(getBody(req))
  try{
    var encounter = await Encounter.findOne({
      _id: req.params.id
    })
    if(encounter instanceof Encounter == false){
      res.status(404).json({message : "No record found"})
    }
    else{
      encounter.sprites.push(sprite)
      await encounter.save();
      res.status(200).json(encounter)
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  } 
 }) 

//ADD SPIRIT

router.put('/:id/add-spirit', async (req, res) =>{
  var spirit = new Spirit(getBody(req))
  try{
    var encounter = await Encounter.findOne({
      _id: req.params.id
    })
    if(encounter instanceof Encounter == false){
      res.status(404).json({message : "No record found"})
    }
    else{
      encounter.spirits.push(spirit)
      await encounter.save();
      res.status(200).json(encounter)
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  } 
 }) 





//DELETE ENCOUNTERS

router.delete("/:id", async (req, res) =>{

  try{  
    await Encounter.deleteOne({
      _id: req.params.id 
    }) 
    res.status(200).json({message: "ID Deleted"}) 
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }

})


//DELETE RUNNER FROM ENCOUNTER

router.delete("/:id/runner/:runner_id", async (req, res) =>{

  try{  
    var encounter = await Encounter.updateOne({
      _id: req.params.id  
    }, {
      $pull : {
        "runners" : {
          _id : req.params.runner_id 
        }
      }
    })
    console.log(encounter) 
    res.status(200).json({message: "Runner Deleted"}) 
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }

})

//DELETE NPC FROM ENCOUNTER

router.delete("/:id/npc/:npc_id", async (req, res) =>{

  try{  
    var encounter = await Encounter.updateOne({
      _id: req.params.id  
    }, {
      $pull : {
        "npcs" : {
          _id : req.params.npc_id 
        }
      }
    })
    console.log(encounter)
    res.status(200).json({message: "Npc Deleted"}) 
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }

})

//DELETE DRONE FROM ENCOUNTER

router.delete("/:id/drone/:drone_id", async (req, res) =>{

  try{  
    var encounter = await Encounter.updateOne({
      _id: req.params.id  
    }, {
      $pull : {
        "drones" : {
          _id : req.params.drone_id 
        }
      }
    })
    console.log(encounter)
    res.status(200).json({message: "Drone Deleted"}) 
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }

})

//DELETE SPRITE FROM ENCOUNTER

router.delete("/:id/sprite/:sprite_id", async (req, res) =>{

  try{  
    var encounter = await Encounter.updateOne({
      _id: req.params.id  
    }, {
      $pull : {
        "sprite" : {
          _id : req.params.sprite_id 
        }
      }
    })
    console.log(encounter)
    res.status(200).json({message: "Sprite Deleted"}) 
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }

})

//DELETE SPIRIT FROM ENCOUNTER

router.delete("/:id/spirit/:spirit_id", async (req, res) =>{

  try{  
    var encounter = await Encounter.updateOne({
      _id: req.params.id  
    }, {
      $pull : {
        "spirit" : {
          _id : req.params.spirit_id 
        }
      }
    })
    console.log(encounter)
    res.status(200).json({message: "Spirit Deleted"}) 
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