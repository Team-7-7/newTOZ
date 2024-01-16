const express = require('express');
const router = require("express").Router();
const prisma = require('../client');

// GET /api/user   1//
router.get("/", async (req, res, next) => {
  try {
    
    res.send("welcome to the user api");
  } catch (error) {
    console.log(error);
  }
  next()
}); 

module.exports = router;