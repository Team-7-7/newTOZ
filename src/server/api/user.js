const express = require('express');
const router = require("express").Router();
const prisma = require('../client');
const verify = require('../util') 

// GET /api/user 
// GET All users -> Would need to be admin to access
router.get("/", async (req, res, next) => {
  try {
    res.send("welcome to the user api");
  } catch (error) {
    console.log(error);
  }
  next()
}); 

// GET /api/user/:id 
// Get's user by id, need to be logged in to access. 
// TODO: add VERIFY in to argument list on line 21
router.get("/:id", async (req, res, next) => {
  const { id } = req.params
  console.log(id)
  try {
    const user = await prisma.user.findUnique({
      where: { id:parseInt(id), }
    });
  res.send(user)
  } catch (error) {
    console.log(error);
  }
  // next() // This next line was giving a "Cannot resend headers Error on the Character Selection component, so removed it"
}); 

// PATCH /api/user/
router.patch("/", async (req, res, next) => {
  const { id, character_id  } = req.body
  console.log(id)
  try {
    const patchedUser = await prisma.user.update({
      where: { id:parseInt(id), },
      data: { character_id:parseInt(character_id), },
    });
  res.send(patchedUser)
  } catch (error) {
    console.log(error);
  }
  // next()
}); 



module.exports = router;