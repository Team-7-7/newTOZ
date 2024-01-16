const router = require("express").Router();

router.use('/login', require('./login'))
router.use('/register', require('./register'))

module.exports = router;
