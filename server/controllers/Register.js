const User = require("../models/User");
const bcrypt = require("bcrypt");
const joi = require("joi");

const register = async (req, res, next) => {
  const { error: validationError } = validateUser(req.body);

  const { name, email, password } = req.body;

  try {
    //if the valudation not pass then this will happen
    if (validationError) {
      const error = new Error(validationError.details[0].message);
      error.statusCode = 400;
      throw error;
    }

    const formatedName = name.toLowerCase();
    const formatedEmail = email.toLowerCase();

    const findedUser = await User.findOne({ email: formatedEmail });
    if (findedUser) {
      const error = new Error("this email is already exist"); //checking  email is already exist or not
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10); //hashing the password

    const newUser = new User({
      //if user not exist then create one new
      name: formatedName,
      email: formatedEmail,
      password: hashedPassword,
    });

    await newUser.save(); //saving the new created user

    res
      .status(200)
      .json({ message: "user registerd successfully", status: true });

  } catch (error) {
    next(error);
  }
};

module.exports = register;

//validating the user details like name minimum 2 character, exmail should be a string, password should be 6-12 char
function validateUser(data) {  
  const userSchema = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(12).required(),
  });

  return userSchema.validate(data);
}
