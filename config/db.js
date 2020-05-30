const mangoose = require("mongoose");

const connDB = async () => {
  try {
    await mangoose.connect(
      "mongodb+srv://Serwis:haslo1234@licencjat-dtrv0.mongodb.net/test?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useCreateIndex: true,
      }
    );
    console.log("Polaczono z baza");
  } catch (err) {
    console.error(err.message);

    process.exit(1);
  }
};

module.exports = connDB;
