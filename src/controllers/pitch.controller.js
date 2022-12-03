const Pitch = require("../models/pitches.model");
const Offer = require("../models/offer.model");

exports.createPitch = (req, res) => {
  if (req.body.equity > 100)
    return res.status(400).json({
      msg: "Equity should be less than 100",
    });

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

exports.createOfferForPitch = async (req, res) => {
  if (req.body.equity > 100) {
    return res.status(400).json({ err: "Equity cannot be greater than 100%" });
  }

  const newOffer = new Offer({ ...req.body });

  newOffer
    .save()
    .catch((err) => res.status(400).json({ err: "Invalid Request Body" }));

  const { _id: id, ...offerData } = newOffer._doc;
  const updatedOffer = { id: id, ...offerData };

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

exports.createOfferForPitch2 = async (req, res) => {
  try {
    if (req.body.equity > 100) {
      return res
        .status(400)
        .json({ err: "Equity cannot be greater than 100%" });
    }

    //Checking if the pitch exists or not
    const pitch = await Pitch.findById(req.params["pitch_id"]);
    if (pitch.length == 0) {
      return res.status(404).json({ err: "Pitch not found!!" });
    }

    const newOffer = new Offer({ ...req.body });
    try {
      await newOffer.save();
    } catch (error) {
      return res.status(400).json({ err: "Invalid request body" });
    }

    const { _id: id, ...offerData } = newOffer._doc;
    const updatedOffer = { id: id, ...offerData };

    const queryString = { _id: req.params["pitch_id"] };
    const updateDocument = {
      $push: { offers: updatedOffer },
    };
    await Pitch.updateOne(queryString, updateDocument);
    res.status(201).json({
      id: newOffer._id,
    });
  } catch (error) {
    res.status(400).json("Invalid Request Body");
  }
};

exports.getAllPitches = (req, res) => {
  const projectionValues =
    "entrepreneur pitchTitle pitchIdea askAmount equity offers";
  Pitch.find({}, projectionValues)
    .sort({ createdAt: -1 })
    .then((pitches) => {
      if (pitches.length == 0) {
        res.json([]);
        return;
      }

      let response = [];
      pitches.forEach((pitch) => {
        const { _id: id, ...pitchData } = pitch._doc;
        response = [
          ...response,
          {
            id: id,
            entrepreneur: pitchData.entrepreneur,
            pitchTitle: pitchData.pitchTitle,
            pitchIdea: pitchData.pitchIdea,
            askAmount: pitchData.askAmount,
            equity: pitchData.equity,
            offers: pitchData.offers.map((offer) => {
              return {
                id: offer.id,
                investor: offer.investor,
                comment: offer.comment,
                amount: offer.amount,
                equity: offer.equity,
              };
            }),
          },
        ];
      });
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json({
        message: "Cannot retrieve the pitches collection",
      });
    });
};

exports.getPitchById = async (req, res) => {
  try {
    const pitchId = req.params["id"];
    const projectionValues =
      "entrepreneur pitchTitle pitchIdea askAmount equity offers";

    const pitch = await Pitch.findById(pitchId, projectionValues);
    res.status(200).json({
      id: pitch._id,
      entrepreneur: pitch.entrepreneur,
      pitchTitle: pitch.pitchTitle,
      pitchIdea: pitch.pitchIdea,
      askAmount: pitch.askAmount,
      equity: pitch.equity,
      offers: pitch.offers.map((offer) => {
        return {
          id: offer.id,
          investor: offer.investor,
          comment: offer.comment,
          amount: offer.amount,
          equity: offer.equity,
        };
      }),
    });
  } catch (error) {
    res.status(404).json("Pitch Not Found");
  }
};
