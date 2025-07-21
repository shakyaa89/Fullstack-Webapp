var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/testing/:userId", (req, res, next) => {
  const userId = req.params.userId;
  res.send(`User ID: ${userId}`);
});

module.exports = router;
