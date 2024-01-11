
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET /api/user   1//
router.get("/", async (req, res, next) => {
  try {
    
    res.send("welcome to the user api");
  } catch (error) {
    console.log(error);
  }
}); 