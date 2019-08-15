const express = require('express')
const router = express.Router()
const Runner = require('../models/runner')
const deepExtend = require('deep-extend')
const AttributeBlock = require('../models/attributeBlock')
const SkillBlock = require('../models/skillBlock')

// Get all runners
router.get('/', async (req, res) => {
  try {
    const runners = await Runner.find()
    res.json(runners)  
  } catch (err) {
  	res.status(500).json({ message: err.message })
  }
})

// Get one runner
router.get('/:id', async (req, res) => {
  try {
    const runner = await Runner.findOne({
      _id: req.params.id 
    })
    res.json(runner)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})



// Create one runner
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

	const runner = new Runner(doc)

  try {
    const newRunner = await runner.save()
    res.status(201).json(newRunner)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.put('/:id/attributes', async (req, res) =>{
  var attributes = new AttributeBlock(getBody(req))
  try{
    var runner = await Runner.findOne({
      _id: req.params.id
    })
    if(runner instanceof Runner == false){
      res.status(404).json({message : "No record found"})
    }
    else{
      runner.attributes = attributes
      await runner.save();
      res.status(200).json(runner)
    }
  }
  catch (err) {
    res.status(500).json({ message: err.message })
  }  

})

router.put('/:id/skills', async (req, res) =>{
  var skills = new SkillBlock(getBody(req))
  try{
    var runner = await Runner.findOne({
      _id: req.params.id
    })
    if(runner instanceof Runner == false){
      res.status(404).json({message : "No record found"})
    }
    else{
      runner.skills = skills
      await runner.save();
      res.status(200).json(runner)
    }
  }
  catch (err) {
    res.status(500).json({ message: err.message })
  }   

})

router.put('/:id/tracks', async (req, res) =>{
  var tracks = new TracksBlock(getBody(req))
  try{
    var runner = await Runner.findOne({
      _id: req.params.id
    })
    if(runner instanceof Runner == false){
      res.status(404).json({message : "No record found"})
    }
    else{
      runner.tracks = tracks
      await runner.save();
      res.status(200).json(runner)
    }
  }
  catch (err) {
    res.status(500).json({ message: err.message })
  }   

})

router.delete("/:id", async (req, res) =>{

  try{  
    await Runner.find({
      _id: req.params.id 
    }).remove() 
    res.status(200).json({message: "ID Deleted"}) 
  }
  catch (err) {
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