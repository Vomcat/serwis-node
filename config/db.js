const sequelize = require("./default");

module.exports = sequelize
  .authenticate()
  .then(() => console.log("połączono z 22 bazą"))
  .catch(err => console.error(err));
