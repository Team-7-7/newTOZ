
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


// GET /api/characterClass //
router.get("/", async (req, res, next) => {
  try {
    
    res.send("welcome to the characterClass api");
  } catch (error) {
    console.log(error);
  }
});

//***********   the below should work for api features when route is confirmed +++++++++++++++++++ */

// // GET /api/class //
// router.get("/", async (req, res, next) => {
//   try {
//     const classes = await prisma.creature.findMany();
//     res.send(classes);
//   } catch (error) {
//     next(error);
//   }
// });

// // GET /api/creatures/:id //
// router.get("/:id", async (req, res, next) => {
//   // grab the id from the url
//   const { id } = req.params;
//   try {
//     const classId = await prisma.creature.findUnique({
//       where: { id: +id },
//     });
//     res.send(classId);
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/:id", async (req, res, next) => {
//   // grab the id from the url
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
