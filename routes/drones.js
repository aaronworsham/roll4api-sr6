const express = require('express')
const router = express.Router()
const Drone = require('../models/drone')
const deepExtend = require('deep-extend')

// GET DRONES

router.get('/', async (req, res) => {
  try {
    const drones = await Drone.find()
    res.json(drones)  
  } catch (err) {
  	res.status(500).json({ message: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const drone = await Drone.findOne({
      _id: req.params.id 
    })
    res.json(drone)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})



// CREATE DRONE

router.post('/', async (req, res) => {
  var data = getBody(req)

	const drone = new Drone(data)

  try {
    const newDrone = await drone.save()
    res.status(201).json(newDrone)
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message })
  }
})


//UPDATE DRONES

router.put('/:id', async (req, res) =>{
  var update = new Drone(getBody(req))
  try{
    var drone = await Drone.updateOne({
      _id: req.params.id
    }, update)
    res.status(200).json(drone)
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }   

})




//DELETE DRONES

router.delete("/:id", async (req, res) =>{

  try{  
    await Drone.deleteOne({
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