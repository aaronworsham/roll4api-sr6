const express = require('express')
const router = express.Router()
const Critter = require('../models/critter')
const deepExtend = require('deep-extend')

// GET CRITTERS

router.get('/', async (req, res) => {
  try {
    const critters = await Critter.find()
    res.json(critters)  
  } catch (err) {
  	res.status(500).json({ message: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const critter = await Critter.findOne({
      _id: req.params.id 
    })
    res.json(critter)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})



// CREATE CRITTER

router.post('/', async (req, res) => {
  var data = getBody(req)

	const critter = new Critter(data)

  try {
    const newCritter = await critter.save()
    res.status(201).json(newCritter)
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message })
  }
})


//UPDATE CRITTERS

router.put('/:id', async (req, res) =>{
  var update = new Critter(getBody(req))
  try{
    var critter = await Critter.updateOne({
      _id: req.params.id
    }, update)
    res.status(200).json(critter)
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }   

})




//DELETE CRITTERS

router.delete("/:id", async (req, res) =>{

  try{  
    await Critter.deleteOne({
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