const express = require('express')
const router = express.Router()
const Drone = require('../models/drone')
const deepExtend = require('deep-extend')
const Weapon = require('../models/weapon')

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
  var update = getBody(req)
  try{
    await Drone.findOneAndUpdate({
        _id: req.params.id
      }, 
      update,
      (err, doc) => {
        return res.status(200).json({message: "Drone Updated"})
      }
    )
    
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
      var drone = await Drone.findOne({
        _id: req.params.id
      })
      if(drone instanceof Drone == false){
        res.status(404).json({message : "No Drone found"})
      }
      else{
        drone.weapons.push(weapon)
        await drone.save();
        res.status(200).json(drone)
      }
    }
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

router.delete("/:id/weapon/:weapon_id", async (req, res) =>{

  try{  
    var drone = await Drone.findOne({
      _id: req.params.id 
    }) 
    console.log("Weapon Delete")
    drone.weapons.id(req.params.weapon_id).remove()
    await drone.save(function (err) {
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