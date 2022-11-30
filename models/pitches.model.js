const mongoose = require("mongoose");

const pitchSchema = mongoose.Schema(
  {
    entrepreneur: {
      type: String,
      required: true,
    },
    pitchTitle: {
      type: String,
      required: true,
    },
    pitchIdea: {
      type: String,
      required: true,
    },
    askAmount: {
      type: Number,
      required: true,
    },
    equity: {
      type: Number,
      required: true,
    },
    offers: [
      {
        type: {
          investor: { type: String, required: true },
          amount: { type: Number, required: true },
          equity: { type: Number, required: true },
          comment: { type: String, required: false },
        },
      },
    ],
  },
  { timestamps: true }
);

const pitches = mongoose.model("pitches", pitchSchema);
module.exports = pitches;
