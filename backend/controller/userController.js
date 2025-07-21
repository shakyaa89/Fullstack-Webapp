const User = require("../model/userModel.js");

const createUser = async (req, res) => {
  const userName = req.body.name;
  const email = req.body.email;
  const pass = req.body.password;

  const userData = new User({
    name: `${userName}`,
    email: `${email}`,
    password: `${pass}`,
    tech: ["HTML", "CSS", "JavaScript"],
  });

  const user = new User(userData);
  await user.save();

  res.status(201).json({
    message: "User Created Successfully!",
    user: user,
  });
};

module.exports = createUser;
