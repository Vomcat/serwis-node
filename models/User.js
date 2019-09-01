const Sequelize = require("sequelize");
const db = require("../config/db");
const { check, validationResult } = require("express-validator/check");

module.exports = db.sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  login: {
    type: Sequelize.STRING,
    unique: true
  },

  fisrt_name: {
    type: Sequelize.STRING
  },
  last_name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING
  },
  created: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
});
