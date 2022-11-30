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

  exports.createOfferForPitch = (req, res) => {
    const newOffer = new Offer({ ...req.body });
  
    newOffer.save((err, response) => {
      if (err) {
        res.status(400).send("Invalid Request Body");
      }
    });
  
    const queryString = { _id: req.params["pitch_id"] };
    const updateDocument = {
      $push: { offers: newOffer },
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
};

exports.getAllPitches = (req, res) => {
  Pitch.find()
    .sort({ createdAt: -1 })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(404).send({
        message: "Cannot retrieve the pitches collection",
        err,
      });
    });
};

exports.getPitchById = (req, res) => {
  Pitch.findById(req.params["id"], (err, response) => {
    if (err) {
      res
        .status(404)
        .send("Pitch Not Found");
    } else {
      // const{id:_id, ...response} = response;
      // console.log(id);
      res.status(200).send(response);
    }
  });
};


