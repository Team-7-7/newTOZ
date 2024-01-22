const express = require('express');
const router = require("express").Router();
const prisma = require('../client');
const verify = require('../util') 

// GET /api/inventory//
// not really sure that this will be useful or a secure idea...
router.get("/", async (req, res, next) => {
  try {
    const completeInventoryTableForAllUsers = await prisma.character_Gear.findMany();
    res.send(completeInventoryTableForAllUsers);
  } catch (error) {
    console.log(error);
    next(error);
  }
}); 


// GET /api/inventory/:id //
  // takes in a character id in PARAMS to give back a gear list pointing to the gear items
router.get("/:id", async (req, res, next) => {
  const { id } = req.params
  try {
    const gear = await prisma.character_Gear.findMany({
      where: { character_id:parseInt(id), }
    });
    res.send(gear);
  } catch (error) {
    console.log(error);
    next(error);
  }
}); 


// POST /api/inventory/ //
  // takes in the GEAR id and CHARCTER id from the request's body to be added to the Character's inventory
  // note, logic to limit a character's items to 8 will live in the front end.
router.post("/", async (req, res, next) =>{
  const { character_id, gear_id } = req.body
  try {
    const addedGear = await prisma.character_Gear.create({
      data: { 
        character_id, 
        gear_id,
      }
    });
    res.send(addedGear);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// DELETE /api/inventory/ //
  // takes in the GEAR id and CHARCTER id from the request's body to delete an item from the Character's inventory
  router.delete("/", async (req, res, next) => {
    const { character_id, gear_id } = req.body;
    try {
      const gearItemToDelete = await prisma.character_Gear.findMany({
        where: { 
          character_id: character_id,
          gear_id: gear_id,
        }
      })

      //in case the user has multiples of the same gear item, so we don't delete ALL of them
      if (gearItemToDelete) {
        const inventory_id = gearItemToDelete[0].id
        const deletedGear = await prisma.character_Gear.delete({
          where: { 
            id:inventory_id,
          }
        });
        res.send(deletedGear)
      }
      
      res.send("Item not found");
    } catch (error) {
      console.log(error);
      next(error);
    }
  });




module.exports = router;