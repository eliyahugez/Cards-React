const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:3000"],
    code: 200,
  })
);

module.exports = app;
