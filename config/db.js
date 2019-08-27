const config = require("./default");

const connectDB = async () => {
  try {
    await config.connect();
    console.log("Polaczone..");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
