const jwt = require('jsonwebtoken');

// verification middleware

const verify = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).send({ message: "Not authorized, token is missing"});

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(' ')[1];
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
      } catch (error) {
        console.error("JWT Verification Error: ", error);
        req.user = null;
        return res.status(401).send({ message: "Invalid Token" });
      }
    } else {
      req.user = null;
    }
  };

module.exports = verify