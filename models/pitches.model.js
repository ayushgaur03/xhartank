const mongoose = require("mongoose");

const pitchSchema = mongoose.Schema(
  {
    entrepreneur: {
      type: String,
      require: true,
    },
    pitchTitle: {
      type: String,
      require: true,
    },
    pitchIdea: {
      type: String,
      require: true,
    },
    askAmount: {
      type: Number,
      require: true,
    },
    equity: {
      type: Number,
      require: true,
    },
    orders: [
      {
        type: {
          investor: String,
          amount: Number,
          equity: Number,
          comment: String,
        },
        require: false,
      },
    ],
  },
  { timestamps: true }
);

const pitches = mongoose.model("pitches", pitchSchema);
module.exports = pitches;
