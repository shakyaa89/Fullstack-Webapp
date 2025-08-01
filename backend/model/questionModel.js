const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  option: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Option",
    required: true,
  },
  questionText: { type: String, required: true },
  choices: [
    {
      label: { type: String }, // "A", "B", "C", etc.
      text: { type: String }, // "React is a framework", etc.
    },
  ],
  correctAnswer: {
    type: String, // match the label ("A", "B", etc.)
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User ",
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
