const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Repairs = require("../../models/Repairs");

router.post(
  "/",

  [
    check("first_name", "Imie jest wymagane").not().isEmpty(),
    check("last_name", "Nazwisko jest wymagane").not().isEmpty(),
    check("device", "Nazwa jest wymagana").not().isEmpty(),
    check("imei", "Imei jest wymagany").not().isEmpty(),
    check("description", "Opis jest wymagany").not().isEmpty(),
    check("cost", "Opis jest wymagany").not().isEmpty(),
  ],

  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }

    try {
      const newRepair = new Repairs({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        email: req.body.email,
        device: req.body.device,
        code: req.body.code,
        imei: req.body.imei,
        description: req.body.description,
        cost: req.body.cost,
        status: req.body.status,
      });

      const repair = await newRepair.save();

      res.json(repair);
    } catch (err) {
      console.error(err.message);

      res.status(500).send("ServerError");
    }
  }
);

router.put(
  "/:id",
  [
    auth,
    [
      check("first_name", "Imie jest wymagane").not().isEmpty(),
      check("last_name", "Nazwisko jest wymagane").not().isEmpty(),
      check("device", "Nazwa jest wymagana").not().isEmpty(),
      check("imei", "Imei jest wymagany").not().isEmpty(),
      check("description", "Opis jest wymagany").not().isEmpty(),
      check("cost", "Opis jest wymagany").not().isEmpty(),
    ],
  ],

  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }

    const newRepair = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
      email: req.body.email,
      device: req.body.device,
      code: req.body.code,
      imei: req.body.imei,
      description: req.body.description,
      cost: req.body.cost,
      status: req.body.status,
      dateEnd: Date.now(),
    };

    try {
      let repair = await Repairs.findOneAndUpdate(
        { _id: req.params.id },
        { $set: newRepair },
        { new: true, upsert: true }
      );
      res.json(repair);
    } catch (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Nie am takiej naprawy" });
      }

      res.status(500).send("ServerError");
    }
  }
);

// get all repairs
router.get("/", auth, async (req, res) => {
  try {
    const repairs = await Repairs.find().sort({ date: -1 });
    res.json(repairs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("ServerError");
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const repair = await Repairs.findOne({ _id: req.params.id });

    res.json(repair);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Nie am takiej naprawy" });
    }
    res.status(500).send("ServerError");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const repair = await Repairs.findById(req.params.id);

    await repair.remove();
    res.json({ msg: "Naprawa usunięta" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Nie am takiej naprawy" });
    }
    res.status(500).send("ServerError");
  }
});
/* router.delete("/", async (req, res) => {
  try {
    await Repairs.deleteMany({ device: "value" });
    res.json({ msg: "Naprawa usunięta" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Nie am takiej naprawy" });
    }
    res.status(500).send("ServerError");
  }
}); */

module.exports = router;
