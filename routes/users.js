const express = require("express");
//const { db } = require("../models/User");
const router = express.Router();
const User = require('../models/User');

router.get("/", (req, res) => {
  res.send("<p>users endpoint</p><p>add /listall to list all users, /listpaused to list paused users</p><p></p>");
});

router.get("/listall", async (req, res) => {
  
  try{
    const users= await User.find();
    res.json(users);
  }
  catch(err){
    res.json({message:err});
  }
});

router.get("/listpaused", async (req, res) => {
  
  try{
    const users= await User.find({stat:"paused"});
    res.json(users);
  }
  catch(err){
    res.json({message:err});
  }
});

router.get("/specific", (req, res) => {
  res.send("specific users are here");
});

router.post('/add',async (req,res)=>{
      const {name,dob,stat} = req.body;

   const newuser = new User({name,dob,stat});

   try{
     const useradd = await newuser.save();
     res.json(useradd);
   }
   catch(err){
    res.json({error:"user addition failed"});
   }
});

router.delete('/:userID',async (req,res)=>{
  try{
    const removeduser = await User.deleteOne({_id:req.params.userID});
    res.json(removeduser);
  }
  catch(err)
  {
    res.json({message:err});
  }
});

router.patch("/toggle/:username", async (req, res) => {
  try{
    const updateduser = await User.updateOne(
      {name:req.params.username},
      {$set:{stat:"paused"}});
      res.json(updateduser);
  }
  catch(err)
  {
    res.json({message:err});
  }
});

router.patch("/toggleactive/:username", async (req, res) => {
  try{
    const updateduser = await User.updateOne(
      {name:req.params.username},
      {$set:{stat:"active"}});
      res.json(updateduser);
  }
  catch(err)
  {
    res.json({message:err});
  }
});


module.exports = router;