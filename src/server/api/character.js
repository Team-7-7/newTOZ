const express = require('express');
const router = require("express").Router();
const prisma = require('../client');

// GET /api/character //
router.get("/", async (req, res, next) => {
  try {
    const allChars = await prisma.character.findMany();
    res.send(allChars);
  } catch (error) {
    console.log(error);
  }
}); 

// GET /api/character/:id //
router.get("/:id", async (req, res, next) => {
  const { id } = req.params
  console.log(id)
  try {
    const user = await prisma.character.findUnique({
      where: { id:+id, }
    });
  res.send(user)
  } catch (error) {
    console.log(error);
  }
  // next()
}); 

// POST /api/character/ //
// specifically for character selection page or admin perhaps
router.post("/", async (req, res, next) => {
  const data = req.body;
  try {
    const newCharacter = await prisma.character.create({
      data
    })
    res.send(newCharacter)

  } catch (error) {
    console.log(error);
  } 
  // next();
})

module.exports = router;