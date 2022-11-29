const mongoose = require("mongoose");

const offerSchema = mongoose.Schema(
  {
    investor: {
      type: String,
      require: true,
    },
    amount: {
      type: Number,
      require: true,
    },
    equity: {
      type: Number,
      require: true,
    },
    comment: {
      type: String,
      require: false,
    },
  },
  { timestamps: true }
);

const offer = mongoose.model("offers", offerSchema);
module.exports = offer;
