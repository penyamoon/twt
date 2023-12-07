const mongoose = require("mongoose");
const Phrase = require("./phrase");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

app.post("/login", (req, res) => {
  Phrase.create(req.body)
    .then((phrase) => res.json(phrase))
    .catch((err) => res.json(err));
});

app.listen(8081, () => {
  console.log("Listening to 8081");
});
