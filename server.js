const express = require("express");
const connectDB = require("./config/db");

const app = express();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Run"));

//Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/customers", require("./routes/api/customers"));
app.use("/api/repairs", require("./routes/api/repairs"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));
