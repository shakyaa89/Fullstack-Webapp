const { mongoose } = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  questionSet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  responses: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      selectedChoiceIds: [
        {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
      ],
    },
  ],
  score: { type: Number, default: 0 }, 
  total: { type: Number, default: 0 }, 
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const Answer = mongoose.model("Answer", AnswerSchema);
module.exports = Answer;
