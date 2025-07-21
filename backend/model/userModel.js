const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  password: String,
  tech: [String],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
