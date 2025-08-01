var express = require("express");
var router = express.Router();
const {
  createUser,
  loginUser,
  getUserListController,
} = require("../controller/userController.js");
const User = require("../model/userModel.js");
const validateTokenMiddlware = require("../middleware/AuthMiddleware.js");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Nodemon and Expressjs in JavaScript Runtime Environment");
});

/* GET users listing. */
router.get("/user", async (req, res) => {
  const userData = await User.find({});

  res.status(200).json({
    message: "User Fetched Successfully!",
    user: userData,
  });
});

router.post("/create", createUser);

router.post("/login", loginUser);

router.get("/list", validateTokenMiddlware, getUserListController);

module.exports = router;
