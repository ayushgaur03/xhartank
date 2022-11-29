var express = require("express");
var cors = require("cors");
// var db = require("./database/config");
var testRouter = require("./routes/test");
var pitchRouter = require("./routes/pitch.router");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Xhartank");

const app = express();

const port = 4000;
app.set("port", 4000);

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
// app.use("/", (req, res, next) => {
//   return res.send("Hello");
// });

app.use("/test", testRouter);
app.use("/pitch", pitchRouter);
// app.use("/todo", todoRouter);
// app.use("/sharedrecords", shareRouter);
// app.use("/auth", authRouter);

module.exports = app;
