
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET /api/character //
router.get("/", async (req, res, next) => {
  try {
    
    res.send("welcome to the character api");
  } catch (error) {
    console.log(error);
  }
}); 