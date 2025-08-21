const Answer = require("../model/answerModel");
const Question = require("../model/questionModel");

async function listQuestionSetController(req, res) {
  try {
    const questionSet = await Question.aggregate([
      {
        $project: {
          title: 1,
          questionCount: { $size: { $ifNull: ["$questions", []] } },
        },
      },
    ]);

    res.json({ questionSet });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getQuestionSetController(req, res) {
  try {
    const { id } = req.params;
    const questionSet = await Question.findById(id).select(
      "-questions.choices.correctAnswer"
    );

    if (!questionSet) {
      return res.status(404).json({ message: "Question set not found" });
    }

    res.json(questionSet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function saveAttemptedQuestionController(req, res) {
  try {
    const { questionSet: questionSetId, responses } = req.body;
    const userId = req.user.id;

    const questionSet = await Question.findById(questionSetId).select(
      "questions._id questions.choices._id questions.choices.correctAnswer"
    );

    if (!questionSet)
      return res.status(404).json({ message: "Question set not found" });

    const result = (responses || []).reduce(
      (acc, current) => {
        const questions = Array.isArray(questionSet.questions)
          ? questionSet.questions
          : [];

        const q = questions.find(
          (qn) => String(qn._id) === String(current.questionId)
        );
        if (!q) return acc;

        const correctIds = (q.choices || [])
          .filter((c) => c.correctAnswer)
          .map((c) => String(c._id));

        const selected = current.selectedChoicesIds || [];

        const allSelectedAreCorrect =
          selected.every((id) => correctIds.includes(String(id))) &&
          correctIds.every((id) => selected.includes(id));

        acc.total += 1;
        if (allSelectedAreCorrect) acc.score += 1;

        acc.details.push({
          questionId: String(q._id),
          selectedChoiceIds: selected.map(String),
          isCorrect: allSelectedAreCorrect,
        });

        return acc;
      },
      { score: 0, total: 0, details: [] }
    );

    const savedAnswer = await new Answer({
      questionSet: questionSetId,
      user: userId,
      responses,
      score: result.score,
      total: result.total,
    }).save();

    res.status(201).json({
      message: "Graded",
      data: {
        score: result.score,
        total: result.total,
        responses: result.details,
        answerId: savedAnswer._id,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  listQuestionSetController,
  getQuestionSetController,
  saveAttemptedQuestionController,
};
