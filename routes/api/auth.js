const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");

router.get("/auth", auth, async (req, res) => {
  try {
    console.log(User);
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("err");
  }
});
router.post(
  [
    check("email", "Wprowadz email").isEmail(),
    check("password", "haslo jest wymagane").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({
        email,
      });
      //Czy istnieje
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "Bledne dane" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      console.log(user);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Bledne dane 1" }] });
      }

      // Return JWT

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 30 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
