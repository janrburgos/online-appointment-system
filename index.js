const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(morgan("tiny"));

app.get("", (req, res) => {
  const data = {
    username: "name",
    age: 0,
  };
  res.send(data);
});

app.listen(PORT, console.log(`server is listening to port ${PORT}`));
