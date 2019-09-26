const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RepairsSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  phone_number: {
    type: String
  },
  email: {
    type: String
  },
  device: {
    type: String,
    required: true
  },
  code: {
    type: String
  },
  imei: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  cost: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Boolean,
    default: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  }
});

module.exports = Repairs = mongoose.model("repairs", RepairsSchema);
