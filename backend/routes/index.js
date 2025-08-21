var express = require("express");
const { verifyUserController } = require("../controller/indexController");
const validateTokenMiddleware = require("../middleware/AuthMiddleware");
var router = express.Router();

router.get("/api/verify/me", validateTokenMiddleware, verifyUserController);

module.exports = router;
