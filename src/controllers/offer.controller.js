const Offer = require("../models/offer.model");

exports.createOffer = (req, res) => {
  const newOffer = new Offer({ ...req.body });
  newOffer.save((err, response) => {
    if (err) {
      res.send({ status: 404, message: "error creating offer", err });
    } else {
      res.status(201).send({
        message: "Offer created! You can see it",
        offerData: response,
      });
    }
  });
};
