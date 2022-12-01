const Pitch = require("../models/pitches.model");
const Offer = require("../models/offer.model");

exports.createPitch = (req, res) => {
  const newPitch = new Pitch({ ...req.body });
  newPitch.save((err, response) => {
    if (err) {
      res.status(400).send("Invalid Request Body");
    } else {
      res.status(201).send({
        id: response.id,
      });
    }
  });
};

exports.createOfferForPitch = (req, res) => {
  const newOffer = new Offer({ ...req.body });

  newOffer.save((err, response) => {
    if (err) {
      res.status(400).send("Invalid Request Body");
    }
  });

  console.log(newOffer);
  const { _id: id, ...offerData } = newOffer._doc;
  console.log(id);
  const updatedOffer = { id: id, ...offerData };
  console.log(offerData);

  const queryString = { _id: req.params["pitch_id"] };
  const updateDocument = {
    $push: { offers: updatedOffer },
  };
  Pitch.updateOne(queryString, updateDocument, (err, response) => {
    if (err) {
      res.status(404).send("Pitch Not Found");
    } else {
      res.status(201).send({
        id: newOffer._id,
      });
    }
  });
};

exports.getAllPitches = (req, res) => {
  const projectionValues =
    "entrepreneur pitchTitle pitchIdea askAmount equity offers";
  Pitch.find({}, projectionValues)
    .sort({ createdAt: -1 })
    .then((pitches) => {
      let response = [];

      pitches.forEach((pitch) => {
        const { _id: id, ...pitchData } = pitch._doc;
        response = [...response, { id, ...pitchData }];
      });
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(404).send({
        message: "Cannot retrieve the pitches collection",
        err,
      });
    });
};

exports.getPitchById = async (req, res) => {
  const pitchId = req.params["id"];
  const projectionValues =
    "entrepreneur pitchTitle pitchIdea askAmount equity offers";

  Pitch.findById(pitchId, projectionValues, (err, pitch) => {
    if (err) {
      res.status(404).send("Pitch Not Found");
    } else {
      const { _id: id, ...pitchData } = pitch._doc;
      res.status(200).send({ id, ...pitchData });
    }
  });
};
