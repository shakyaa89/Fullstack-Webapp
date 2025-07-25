const User = require("../model/userModel.js");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All Fields are required!" });
  }

  const checkEmail = await User.findOne({ email });
  if (checkEmail) {
    return res.status(400).json({ message: "User already exists!" });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const userData = new User({
    name,
    email,
    password: `${encryptedPassword}`,
  });

  const user = new User(userData);
  await user.save();

  res.status(201).json({
    message: "User Created Successfully!",
    user: user,
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User Not Found!" });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  res.status(200).json({
    message: "User Logged In Successfully!",
    user: user,
  });

};

module.exports = { createUser, loginUser };
