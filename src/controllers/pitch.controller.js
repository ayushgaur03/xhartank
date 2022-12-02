const Pitch = require("../models/pitches.model");
const Offer = require("../models/offer.model");

exports.createPitch = (req, res) => {
  if (req.body.equity > 100)
    res.status(400).json({
      'msg': 'Equity should be less than 100'
    })

  const newPitch = new Pitch({ ...req.body });
  newPitch.save((err, response) => {
    if (err) {
      res.status(400).json("Invalid Request Body");
    } else {
      res.status(201).json({
        id: response.id,
      });
    }
  });
};

exports.createOfferForPitch = (req, res) => {
  const newOffer = new Offer({ ...req.body });

  newOffer.save((err, response) => {
    if (err) {
      res.status(400).json({ err: "Invalid Request Body" });
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
      res.status(404).json("Pitch Not Found");
    } else {
      res.status(201).json({
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

      if (pitches.length == 0) {
        res.json([])
        return
      }

      let response = []
      pitches.forEach((pitch) => {
        const { _id: id, ...pitchData } = pitch._doc;
        response = [...response, {
          id: id,
          entrepreneur: pitchData.entrepreneur,
          pitchTitle: pitchData.pitchTitle,
          pitchIdea: pitchData.pitchIdea,
          askAmount: pitchData.askAmount,
          equity: pitchData.equity,
          offers: pitchData.offers.map(offer => {
            return {
              id: offer.id,
              investor: offer.investor,
              comment: offer.comment,
              amount: offer.amount,
              equity: offer.equity,
            }
          }
          )
        }];
      });
      res.status(200).json(response)
    })
    .catch((err) => {
      res.status(404).json({
        message: "Cannot retrieve the pitches collection",
      });
    });
};

exports.getPitchById = async (req, res) => {
  const pitchId = req.params["id"];
  const projectionValues =
    "entrepreneur pitchTitle pitchIdea askAmount equity offers";

  Pitch.findById(pitchId, projectionValues, (err, pitch) => {
    if (err) {
      res.status(404).json("Pitch Not Found");
    } else {
      if (pitch.length == 0) {
        res.json([])
        return
      }
      res.status(200).json({
        id: pitch._id,
        entrepreneur: pitch.entrepreneur,
        pitchTitle: pitch.pitchTitle,
        pitchIdea: pitch.pitchIdea,
        askAmount: pitch.askAmount,
        equity: pitch.equity,
        offers: pitch.offers.map(offer => {
          return {
            id: offer.id,
            investor: offer.investor,
            comment: offer.comment,
            amount: offer.amount,
            equity: offer.equity,
          }
        }
        )
      })
    }
  });
};
