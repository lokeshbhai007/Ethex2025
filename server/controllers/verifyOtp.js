const User = require("../models/User");

const verifyOtp = async (req, res, next) => {
  const { otp } = req.body;

  try {
    const findedUser = await User.findOne({ "otp.otp": otp }); 
    if (!findedUser) {  //if not then means user not ask for otp
      const error = new Error("invalid otp");
      error.statusCode = 400;
      throw error;
    }

    if (new Date(findedUser.otp.sendTime).getTime() < new Date().getTime()) { //checking otp exipre or not
      const error = new Error("otp expired");
      error.statusCode = 400;
      throw error;
    }

    findedUser.otp.otp = null;
    await findedUser.save();
    res.status(200).json({ message: "otp verified", status: true });
    
  } catch (error) {
    next(error);
  }
};

module.exports = verifyOtp;