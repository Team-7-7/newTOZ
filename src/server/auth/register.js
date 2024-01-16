const express = require('express');
const router = express.Router();
const prisma = require('../client');
const bcrypt = require('bcrypt');
const saltRounds = 7;
const jwt = require('jsonwebtoken');

// auth/register
router.post('/', async (req, res) => {
  //Todo check if user already in system

  const { username, password, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        username,
        password:hashedPassword,
        email,
      },
    });

    const { id } = newUser;
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
      expiresIn: '2w',
    });
    res.status(201).send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
