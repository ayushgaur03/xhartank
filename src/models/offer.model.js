const mongoose = require("mongoose");

const offerSchema = mongoose.Schema({
  investor: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  equity: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
});

const offer = mongoose.model("offers", offerSchema);
module.exports = offer;
