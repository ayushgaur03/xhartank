var pitchController = require("../controllers/pitch.controller");
var express = require("express");
var router = express.Router();

router.post("/", (res, req) => {
  pitchController.createPitch(res, req);
});

router.post("/:pitch_id/makeOffer", (res, req) => {
  pitchController.createOfferForPitch(res, req);
});

router.get("/", (res, req) => {
  pitchController.getAllPitches(res, req);
});

router.get("/:id", (res, req) => {
  pitchController.getPitchById(res, req);
});

module.exports = router;
