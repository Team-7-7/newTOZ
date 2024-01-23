const router = require("express").Router();

router.use("/user", require("./user"));
router.use("/characterclass", require("./characterClass.js"));
router.use("/character", require("./character.js"));
router.use("/monster", require("./monster.js"));
router.use("/gear", require("./gear.js"));
router.use("/inventory", require("./inventory.js"));
router.use("/spell", require("./spell.js"));

//send error if no routes matched
// router.use((error, req, res, next) => {
//   res.send(error);
// });

module.exports = router;