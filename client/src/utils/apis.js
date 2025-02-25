const apis = () => {
  const local = "http://localhost:5555/";

  const list = {
    registerUser: `${local}user/register`,
    loginUser: `${local}user/login`,
    forgetPassword: `${local}user/forget/password`,
    otpVerify: `${local}user/otp/verify`,
    getOtpTime: `${local}user/otp/time`,
    updatePassword: `${local}user/password/update`,
    getAccess: `${local}user/get/access`,
    getUserDetails: `${local}user/profile`,
  };

  return list;
};

export default apis;
