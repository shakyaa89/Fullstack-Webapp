var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var professorsRouter = require("./routes/professors");
var adminRouter = require("./routes/adminRoutes");
var questionRouter = require("./routes/questionRoute");

var app = express();

app.use(express.json());

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/professors", professorsRouter);
app.use("/api/admin", adminRouter);
app.use("/api/questions", questionRouter);

const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose
    .connect(
      "mongodb+srv://Professor:Fifa21nba@professor.ed2lqca.mongodb.net/",
      {
        dbName: "professor_database",
      }
    )
    .then((data) => {
      console.log("Database connected successfully!", data.connection.name);
    });
}

module.exports = app;
