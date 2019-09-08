const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // odebranie tokena z header
  const token = req.header("x-auth-token");

  // sprawdzenie czy nie ma tokenu

  if (!token) {
    return res.status(401).json({ msg: "Brak tokenu" });
  }

  //weryfikacja tokenu
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token nie dziala" });
  }
};
