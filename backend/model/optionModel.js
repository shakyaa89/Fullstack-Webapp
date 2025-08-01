const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
});

const Option = mongoose.model("Option", optionSchema);

module.exports = Option;
