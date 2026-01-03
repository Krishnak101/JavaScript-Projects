const express = require("express");
const connectDB = require("./config/db");

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send("API running "));

app.listen(PORT, () => console.log(`server started on port ${PORT}`));