var express = require("express");
var router = express.Router();
const {
  createUser,
  loginUser,
  getUserListController,
  updateProfileMeController,
  viewMyProfileController,
  viewProfileofUserController,
} = require("../controller/userController.js");
const User = require("../model/userModel.js");
const validateTokenMiddleware = require("../middleware/AuthMiddleware.js");
const { uploadMiddleware } = require("../middleware/FileHandleMiddleware.js");

router.post("/create", createUser);

router.post("/login", loginUser);

router.get("/list", validateTokenMiddleware, getUserListController);

router.put(
  "/profile",
  validateTokenMiddleware,
  uploadMiddleware.single("profileImg"),
  updateProfileMeController
);

router.get("/profile/me", validateTokenMiddleware, viewMyProfileController);

router.get(
  "/profile/:id",
  validateTokenMiddleware,

  viewProfileofUserController
);

module.exports = router;
