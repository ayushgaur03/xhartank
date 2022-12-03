var pitchController = require("../controllers/pitch.controller");
var express = require("express");
var router = express.Router();

router.post("/", async (res, req) => {
  await pitchController.createPitch(res, req);
});

router.post("/:pitch_id/makeOffer", async(res, req) => {
  await pitchController.createOfferForPitch2(res, req);
});

router.get("/", async(res, req) => {
  await pitchController.getAllPitches(res, req);
});

router.get("/:id", async(res, req) => {
  await pitchController.getPitchById(res, req);
});

module.exports = router;
