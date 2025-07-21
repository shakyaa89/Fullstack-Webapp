var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({
    name: "Professor Name",
    college: "Islington College",
    tech: ["JavaScript", "Express", "React"],
  });
});

module.exports = router;
