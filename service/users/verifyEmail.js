const { User } = require("../../models");

const { RequestError, sendMail } = require("../../helpers");

const verifyEmail = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw RequestError(400, "Not Found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  await sendMail({
    to: user.email,
    subject: "Verification success!",
    text: `Verification success`,
    html: `Verification success`,
  });

  return true;
};


module.exports = verifyEmail;