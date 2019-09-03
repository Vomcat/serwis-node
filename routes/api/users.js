const express = require("express");

const router = express.Router();
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({ errors: [{ msg: "Użytkownik istnieje" }] });
      }
      //Czy istnieje
      //Szyfrowanie hasla
      // Return JWT
      res.send("user route");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
