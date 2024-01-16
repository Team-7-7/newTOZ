const express = require('express');
const router = require("express").Router();
const prisma = require('../client');

// GET /api/monster //
router.get("/", async (req, res, next) => {
  try {
    const monsters = await prisma.monster.findMany();
    res.send(monsters)
  } catch (error) {
    console.log(error);
  }
  next();
}); 

// GET /api/monster/:id //
router.get("/:id", async (req, res, next) => {
  const { id } = req.params
  console.log(id)
  try {
    const user = await prisma.monster.findUnique({
      where: { id:+id, }
    });
  res.send(user)
  } catch (error) {
    console.log(error);
  }
  next()
}); 

module.exports = router;