const express = require('express');
const router = require("express").Router();
const prisma = require('../client');

// GET /api/character
// Gets all characters
router.get("/", async (req, res, next) => {
  try {
    const allChars = await prisma.character.findMany();
    res.send(allChars);
  } catch (error) {
    console.log(error);
  }
}); 

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
  next()
}); 

module.exports = router;