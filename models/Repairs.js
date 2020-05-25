const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RepairsSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
  },
  email: {
    type: String,
  },
  device: {
    type: String,
    required: true,
  },
  code: {
    type: String,
  },
  imei: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  dateStart: {
    type: Date,
    default: new Date(),
  },
  dateEnd: {
    type: Date,
    default: new Date(),
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = Repairs = mongoose.model("repairs", RepairsSchema);
