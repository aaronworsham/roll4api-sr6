const express = require('express')
const router = express.Router()
const Vehicle = require('../models/vehicle')
const deepExtend = require('deep-extend')

// GET VEHICLES

router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find()
    res.json(vehicles)  
  } catch (err) {
  	res.status(500).json({ message: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({
      _id: req.params.id 
    })
    res.json(vehicle)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})



// CREATE VEHICLE

router.post('/', async (req, res) => {
  var data = getBody(req)

	const vehicle = new Vehicle(data)

  try {
    const newVehicle = await vehicle.save()
    res.status(201).json(newVehicle)
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message })
  }
})


//UPDATE VEHICLES

router.put('/:id', async (req, res) =>{
  var update = new Vehicle(getBody(req))
  try{
    var vehicle = await Vehicle.updateOne({
      _id: req.params.id
    }, update)
    res.status(200).json(vehicle)
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }   

})




//DELETE VEHICLES

router.delete("/:id", async (req, res) =>{

  try{  
    await Vehicle.deleteOne({
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