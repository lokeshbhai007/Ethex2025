const User = require("../models/User");
const bcrypt = require("bcrypt");
const joi = require("joi");

const register = async (req, res, next) => {
  const { error: validationError } = validateUser(req.body);
  const { name, email, password } = req.body;

  try {
    if (validationError) {
      return res.status(400).json({ message: validationError.details[0].message });
    }

    const formattedName = name;
    const formattedEmail = email.toLowerCase();

    const existingUser = await User.findOne({ email: formattedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: formattedName,
      email: formattedEmail,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully", status: true });
  } catch (error) {
    next(error);
  }
};

module.exports = register;

function validateUser(data) {
  const userSchema = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(12).required(),
  });

  return userSchema.validate(data);
}
