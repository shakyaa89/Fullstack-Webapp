const express = require("express");
const router = express.Router();

const {
  listQuestionSetController,
  getQuestionSetController,
  saveAttemptedQuestionController,
} = require("../controller/questionController");
const validateTokenMiddleware = require("../middleware/AuthMiddleware");


router.get("/set/list", validateTokenMiddleware, listQuestionSetController);
router.get("/set/:id", validateTokenMiddleware, getQuestionSetController);
router.post(
  "/answer/attempt",
  validateTokenMiddleware,
  saveAttemptedQuestionController
);

module.exports = router;
