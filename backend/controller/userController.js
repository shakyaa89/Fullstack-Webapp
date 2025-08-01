const User = require("../model/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

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

  if (!email || !password)
    return res.status(400).json({ message: "All fields are required!" });

  const user = await User.findOne({ email }).select("+password");

  if (!user) return res.status(404).json({ message: "User Not Found!" });

  const checkPassword = await bcrypt.compare(password, user.password);

  if (checkPassword) {
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      "Hello123!",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "Login Successful",
      accessToken: token,
    });
  } else {
    return res.status(400).json({ message: "Invalid Credentials" });
  }
};

const getUserListController = async (req, res) => {
  const userList = await User.find();

  res.status(200).json({
    message: "User Fetched Successfully!",
    user: userList,
  });
};

module.exports = { createUser, loginUser, getUserListController };
