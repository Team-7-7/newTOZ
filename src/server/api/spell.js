const express = require("express");
const router = require("express").Router();
const prisma = require("../client");

// GET /api/spell //
router.get("/", async (req, res, next) => {
  try {
    const spells = await prisma.spells.findMany();
    res.send(spells);
  } catch (error) {
    console.log(error);
  }
  next();
});

// GET /api/spell/:id //
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const spell = await prisma.spells.findUnique({
      where: { id: parseInt(id) },
    });
    res.send(spell);
  } catch (error) {
    console.log(error);
  }
  next();
});

module.exports = router;
