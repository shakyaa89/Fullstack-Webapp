const express = require("express");
const router = express.Router();

const {
  listQuestionSetController,
  getQuestionSetController,
  saveAttemptedQuestionController,
} = require("../controller/questionController");
const validateTokenMiddleware = require("../middleware/AuthMiddleware");

// Debug: check imported functions
console.log({
  listQuestionSetController,
  getQuestionSetController,
  saveAttemptedQuestionController,
});

// Routes
router.get("/set/list", validateTokenMiddleware, listQuestionSetController);
router.get("/set/:id", validateTokenMiddleware, getQuestionSetController);
router.post(
  "/answer/attempt",
  validateTokenMiddleware,
  saveAttemptedQuestionController
);

module.exports = router;
