const { mongoose } = require("mongoose");

const questionSetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      questionText: {
        type: String,
        required: true,
      },

      choices: [
        {
          label: {
            type: String,
            required: true,
          },
          text: {
            type: String,
            required: true,
          },
          correctAnswer: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
  ],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Question = mongoose.model("Question", questionSetSchema);
module.exports = Question;
