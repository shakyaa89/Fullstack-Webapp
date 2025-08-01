const mongoose = require("mongoose");

const answerSchema = mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // professional
  selectedAnswer: { type: String, required: true }, // e.g., "B"
  isCorrect: { type: Boolean }, // evaluated on save
});

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
