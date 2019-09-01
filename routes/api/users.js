const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

router.post(
  "/",
  [
    check("name", "Imię jest wymagane")
      .not()
      .isEmpty(),
    check("email", "Wprowadz email").isEmail(),
    check("password", "Hasło powinno zawierać więcej niż 6 znaków").isLength({
      min: 6
    })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("user route");
  }
);

module.exports = router;
