const express = require('express');
const router = require("express").Router();
const prisma = require('../client');


// GET /api/characterclass //
router.get("/", async (req, res, next) => {
  try {
    const charClasses = await prisma.character_Class.findMany();
    res.send(charClasses);
  } catch (error) {
    console.log(error);
  }
  // next();
});

// GET /api/characterclass/:id //
router.get("/:id", async (req, res, next) => {
  const { id } = req.params
  console.log(id)
  try {
    const user = await prisma.character_Class.findUnique({
      where: { id:+id, }
    });
  res.send(user)
  } catch (error) {
    console.log(error);
  }
  // next()
}); 



//***********   the below should work for api features when route is confirmed +++++++++++++++++++ */




// router.delete("/:id", async (req, res, next) => {
//   // grab the id from the Url
//   const { id } = req.params;
//   try {
//     const classToDelete = await prisma.creature.delete({
//       where: { id: +id },
//     });
//     res.send(classToDelete);
//   } catch (error) {
//     next(error);
//   }
// });

// // POST /api/users/register //
// router.post("/add", async (req, res, next) => {
//   // this route registers a new class
//   const { name, description, beginning_attack, beginning_armor, beginning_speed, beginning_hp } = req.body;

//   try {

//     // Create a new class in the database
//     const characterClass = await prisma.user.create({
//       data: {
//         name,
//         description, 
//         beginning_attack, 
//         beginning_armor, 
//         beginning_speed, 
//         beginning_hp
//       },
//     });
//     res.send(characterClass);
//   } catch (error) {
//     // TODO: i think it could be something else that we could handle
//     res.send(error);
//     next();
//   }
// });

module.exports = router;
