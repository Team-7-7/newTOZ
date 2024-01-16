const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/characterClass", require("./characterClass.js"));
router.use("/character", require("./characters.js"));
router.use("/monsters", require("./monsters.js"));
router.use("/gear", require("./gear.js"));

send error if no routes matched
router.use((error, req, res, next) => {
  res.send(error);
});

module.exports = router;