var express = require("express");
var cors = require("cors");
const process = require("process");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var pitchRouter = require("./routes/pitch.router");

dotenv.config();
/*
 * Database Configuration & Configuration
 */
mongoose.connect(process.env.DB_LINK);

const app = express();

app.set("port", process.env.PORT);

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

module.exports = app;
