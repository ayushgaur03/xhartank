const Pitch = require("../models/pitches.model");
const Offer = require("../models/offer.model");

exports.createPitch = (req, res) => {
  const newPitch = new Pitch({ ...req.body });
  newPitch.save((err, response) => {
    if (err) {
      res.send({ status: 404, message: "error creating pitch", err });
    } else {
      res.status(201).send({
        message: "Pitch created! You can see its id",
        pitchData: response.id,
      });
    }
  });
};

exports.getPitchById = (req, res) => {
  Pitch.findById(req.params["id"], (err, response) => {
    if (err) {
      res
        .status(404)
        .send({ status: 404, message: "Id not matched with any pitch", err });
    } else {
      res.status(200).send({
        message: "Pitch found!!",
        pitchData: response,
      });
    }
  });
};

exports.getAllPitches = (req, res) => {
  Pitch.find()
    .sort({ createdAt: -1 })
    .then((response) => {
      res.status(200).send({
        pitches: response,
      });
    })
    .catch((err) => {
      res.status(200).send({
        message: "Cannot retrieve the pitches collection",
        err,
      });
    });
};

exports.createOfferForPitch = (req, res) => {
  const newOffer = new Offer({ ...req.body });

  newOffer.save((err, response) => {
    if (err) {
      res.status(404).send({ message: "Required fields missing!!", err });
    }
  });

  const queryString = { _id: req.params["pitch_id"] };
  const updateDocument = {
    $push: { offers: newOffer },
  };
  Pitch.updateOne(queryString, updateDocument, (err, response) => {
    if (err) {
      res.send({ status: 404, message: "error creating pitch", err });
    } else {
      res.status(201).send({
        message: "Pitch updated! You can check it",
        pitchData: response,
      });
    }
  });
};
