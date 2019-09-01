const config = require("./default");
const Sequelize = require("sequelize");

const connectDB = async () => {
  try {
    await config.authenticate();
    console.log("Polaczone..");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
