const express = require('express')
const router = express.Router()
const Runner = require('../models/runner')
const deepExtend = require('deep-extend')

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
    info: {
      name : data.name,
      owner: null,
      icon: null,
      portrait: null
    }

  }

	const runner = new Runner(doc)

  try {
    const newRunner = await runner.save()
    res.status(201).json(newRunner)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.put('/:id/info', async (req, res) => {
  var data = getBody(req)
  try{
    var doc = await Runner.findOne({
      _id: req.params.id
    })
    if(doc instanceof Runner == false){
      res.status(404).json({message : "No record found"})
    }
    else{
      deepExtend(doc, {info: data})
      await doc.save();
    }
   
    // await runner.save()
  }
  catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.put('/:id/attributes', async (req, res) =>{
  var attributes = getBody(req)
  try{
    var doc = await Runner.findOne({
      _id: req.params.id
    })

    doc.attributes = attributes
    console.log(doc)
    await doc.save();
    res.json(doc)
   
    // await runner.save()
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