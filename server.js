const express = require("express");
const connectDB = require("./config/db");

const app = express();

app.get("/", (req, res) => res.send("dziala"));

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));
