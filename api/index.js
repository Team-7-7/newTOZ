const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


  

router.use("/users", require("./users.js"));
router.use("/characterClass", require("./characterClass.js"));
router.use("/characters", require("./characters.js"));
router.use("/monsters", require("./monsters.js"));
router.use("/gear", require("./gear.js"));

// send error if no routes matched
router.use((error, req, res, next) => {
  res.send(error);
});

module.exports = router;
 