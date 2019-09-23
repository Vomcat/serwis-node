const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

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

    const { name, first_name, last_name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      //Czy istnieje
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Użytkownik istnieje" }] });
      }

      user = new User({
        name,
        first_name,
        last_name,
        email,
        password
      });

      //Szyfrowanie hasla
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return JWT
      /*
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );*/
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
