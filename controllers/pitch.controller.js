const pitch = require("../models/pitches.model");

exports.createPitch = (req, res) => {
  const newPitch = new pitch({ ...req.body });
  newPitch.save((err, response) => {
    if (err) {
      res.send({ status: 500, message: "error creating user", err });
    } else {
      res.send({
        status: 201,
        message: "user is created successfully but has not been verified yet",
        userData: response,
      });
    }
  });
};
