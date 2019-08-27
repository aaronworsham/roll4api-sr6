const express = require('express')
const router = express.Router()
const Other = require('../models/other')
const deepExtend = require('deep-extend')
const AttributeBlock = require('../models/attributeBlock')
const SkillBlock = require('../models/skillBlock')
const TrackBlock = require('../models/trackBlock')
const Weapon = require('../models/weapon')
const Armor = require('../models/armor')

// GET OTHERS

router.get('/', async (req, res) => {
  try {
    const others = await Other.find()
    res.json(others)  
  } catch (err) {
  	res.status(500).json({ message: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const other = await Other.findOne({
      _id: req.params.id 
    })
    res.json(other)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})



// CREATE OTHER

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

	const other = new Other(doc)

  try {
    const newOther = await other.save()
    res.status(201).json(newOther)
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message })
  }
})


//UPDATE OTHERS

router.put('/:id', async (req, res) =>{
  var update = new Other(getBody(req))
  try{
    var other = await Other.findOne({
      _id: req.params.id
    })
    if(other instanceof Other == false){
      res.status(404).json({message : "No record found"})
    }
    else{
      other.name = update.name
      await other.save();
      res.status(200).json(other)
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
    var other = await Other.findOne({
      _id: req.params.id
    })
    if(other instanceof Other == false){
      res.status(404).json({message : "No record found"})
    }
    else{
      other.attributes = attributes
      await other.save();
      res.status(200).json(other)
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
    var other = await Other.findOne({
      _id: req.params.id
    })
    if(other instanceof Other == false){
      res.status(404).json({message : "No record found"})
    }
    else{
      other.skills = skills
      await other.save();
      res.status(200).json(other)
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }   

})

router.put('/:id/tracks', async (req, res) =>{
  var tracks = new TrackBlock(getBody(req))
  try{
    var other = await Other.findOne({
      _id: req.params.id
    })
    if(other instanceof Other == false){
      res.status(404).json({message : "No record found"})
    }
    else{
      other.tracks = tracks
      await other.save();
      res.status(200).json(other)
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
      var other = await Other.findOne({
        _id: req.params.id
      })
      if(other instanceof Other == false){
        res.status(404).json({message : "No Other found"})
      }
      else{
        other.weapons.push(weapon)
        await other.save();
        res.status(200).json(other)
      }
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }   

})

router.put('/:id/armor', async (req, res) =>{
  var armorArray = getBody(req)
  try{
    for (var i = armorArray.length - 1; i >= 0; i--) {
      var armor = new Armor(armorArray[i])
      var other = await Other.findOne({
        _id: req.params.id
      })
      if(other instanceof Other == false){
        res.status(404).json({message : "No Other found"})
      }
      else{
        other.armor.push(armor)
        await other.save();
        res.status(200).json(other)
      }
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }   

})





//DELETE OTHERS

router.delete("/:id", async (req, res) =>{

  try{  
    await Other.deleteOne({
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
    var other = await Other.findOne({
      _id: req.params.id 
    }) 
    console.log("Weapon Delete")
    other.weapons.id(req.params.weapon_id).remove()
    await other.save(function (err) {
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

router.delete("/:id/armor/:armor_id", async (req, res) =>{

  try{  
    var other = await Other.findOne({
      _id: req.params.id 
    }) 
    console.log("Armor Delete")
    other.armor.id(req.params.armor_id).remove()
    await other.save(function (err) {
      if (err) return handleError(err);
      console.log('the subdoc was removed');
      res.status(200).json({message: "Armor Deleted"}) 
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