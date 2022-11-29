const Pitch = require("../models/pitches.model");

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
