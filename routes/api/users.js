const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

router.post("/", (req, res) => {
  console.log(req.body);
  res.send("user route");
});

module.exports = router;
