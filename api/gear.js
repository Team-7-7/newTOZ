
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET /api/gear //
router.get("/", async (req, res, next) => {
  try {
    
    res.send("welcome to the gear api");
  } catch (error) {
    console.log(error);
  }
}); 