const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const formattedEmail = email.toLowerCase();

    const foundUser = await User.findOne({ email: formattedEmail });
    if (!foundUser) {
      return res.status(400).json({ message: "No user found", status: false });
    }

    const isPassMatch = await bcrypt.compare(password, foundUser.password);
    if (!isPassMatch) {
      return res.status(400).json({ message: "Incorrect email or password", status: false });
    }

    // Generate JWT token
    const accessToken = jwt.sign(
      { email: foundUser.email, userId: foundUser._id, name: foundUser.name },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      status: true,
      token: accessToken,
      user: { name: foundUser.name, email: foundUser.email },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
