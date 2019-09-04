const Sequelize = require("sequelize");

const sequelize = new Sequelize("service", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  jwtSecret: "$mysecret",

  define: {
    timestamps: false
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => console.log("połączono z bazą"))
  .catch(err => console.error(err));

module.exports = sequelize;
