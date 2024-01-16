const express = require('express');
const router = require("express").Router();
const prisma = require('../client');

// GET /api/gear //
router.get("/", async (req, res, next) => {
  try {
    
    res.send("welcome to the gear api");
  } catch (error) {
    console.log(error);
  }
}); 

module.exports = router;