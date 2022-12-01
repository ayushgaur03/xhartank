var express = require("express");
var cors = require("cors");
const process = require("process");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var pitchRouter = require("./routes/pitch.router");
var offerRouter = require("./routes/offer.router");

dotenv.config();
/*
 * Database Configuration & Configuration
 */

mongoose
  .connect("mongodb://localhost:27017/xhartank")
  .then(() => console.log("Db connected"))
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.set("port", 8081);

/*
 * Configuring express to recieve data in JSON format
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/*
 * MiddleWare Configuration
 */
// app.use(appLogger);

/*
 * Router Configuration
 */
app.use("/pitches", pitchRouter);
app.use("/offer", offerRouter);

module.exports = app;
