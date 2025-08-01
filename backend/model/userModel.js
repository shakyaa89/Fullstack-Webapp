const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: {
    type: String,
    enum: ["Professional", "Admin"],
    default: "Professional",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
