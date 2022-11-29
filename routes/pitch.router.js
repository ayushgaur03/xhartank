var pitchController = require("../controllers/pitch.controller");
var { creat } = require("../controllers/pitch.controller");
var express = require("express");
var router = express.Router();

router.post("/", (res, req) => {
  pitchController.createPitch(res, req);
});

module.exports = router;
