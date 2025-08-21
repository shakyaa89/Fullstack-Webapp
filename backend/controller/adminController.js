const Question = require("../model/questionModel");

async function createQuestionSetController(req, res) {
  const data = req.body;
  const { id, role } = req.user;

  const finalData = {
    ...data,
    createdBy: id,
  };

  const createSet = new Question(finalData);
  await createSet.save();

  res.status(201).json({
    message: "Question Set Created Successfully!",
    questionSet: createSet,
  });
}

module.exports = { createQuestionSetController };
