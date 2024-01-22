const express = require('express');
const router = require("express").Router();
const prisma = require('../client');

// GET /api/gear //
router.get("/", async (req, res, next) => {
  try {
    const allGear = await prisma.gear.findMany();
    res.send(allGear);
  } catch (error) {
    console.log(error);
    next(error);
  }
}); 

// GET /api/gear/:id //
router.get("/:id", async (req, res, next) => {
  const { id } = req.params
  try {
    const gear = await prisma.gear.findUnique({
      where: { id:parseInt(id), }
    });
    res.send(gear);
  } catch (error) {
    console.log(error);
    next(error);
  }
}); 


module.exports = router;