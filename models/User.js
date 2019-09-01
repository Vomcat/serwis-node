const Sequelize = require("sequelize");

const db = require("../config/db");

module.exports = db.sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
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
