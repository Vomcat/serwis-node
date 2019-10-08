const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

const User = require("../../models/User");

router.post(
  "/",
  [
    auth,
    [
      check("name", "Imię jest wymagane")
        .not()
        .isEmpty(),
      check("email", "Wprowadz email").isEmail(),
      check("password", "Hasło powinno zawierać więcej niż 6 znaków").isLength({
        min: 6
      })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, first_name, last_name, email, password, status } = req.body;

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
        password,
        status
      });

      //Szyfrowanie hasla
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      res.json(user);

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

router.put(
  "/:id",
  [
    [
      check("name", "Imię jest wymagane")
        .not()
        .isEmpty(),
      check("email", "Wprowadz email").isEmail(),
      check("password", "Hasło powinno zawierać więcej niż 6 znaków").isLength({
        min: 6
      })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    /* const { name, first_name, last_name, email, password, status } = req.body;
    user = new User({
      name,
      first_name,
      last_name,
      email,
      password,
      status
    }); */
    const newUser = {
      name: req.body.name,
      first_name: req.body.first_name,
      last_name: req.body.last_name,

      email: req.body.email,

      password: req.body.password,
      status: req.body.status
    };

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    try {
      work = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: newUser },
        { new: true, upsert: true }
      );

      res.json(work);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find().sort({ date: -1 });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("ServerError");
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "Nie am takiego użytkownika" });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Nie am takiej użytkownika" });
    }
    res.status(500).send("ServerError");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    await user.remove();
    res.json({ msg: "Użytkownik usunięty" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Błąd" });
    }
    res.status(500).send("ServerError");
  }
});

module.exports = router;
