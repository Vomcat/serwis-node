const mangoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connDB = async () => {
  try {
    await mangoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log("Polaczono z baza");
  } catch (err) {
    console.error(err.message);

    process.exit(1);
  }
};

module.exports = connDB;
