const { User } = require("../../models");

const { RequestError, sendMail } = require("../../helpers");

const reVerifyEmail = async (email) => {
    const user = await User.findOne({ email });
    
  if (!user) {
    throw RequestError(400, "Not Found");
  }
  if (!user.verificationToken) {
    throw RequestError(400, "Verification has already been passed");
  }

  await sendMail({
    to: email,
    subject: "Confirm registration!",
    text: `Please confirm your email adress POST http://localhost:3000/api/users/verify/${user.verificationToken}`,
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">confirm your verification</a`,
  });
    
  return true;
};


module.exports = reVerifyEmail;