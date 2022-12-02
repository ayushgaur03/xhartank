var offerController = require("../controllers/offer.controller");
var express = require("express");
var router = express.Router();

router.post("/", (req, res) => {
  offerController.createOffer(req, res);
});
module.exports = router;
