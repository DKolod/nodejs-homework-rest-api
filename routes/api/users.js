const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const { users: ctrl } = require("../../controllers");
const { auth, validation, upload } = require("../../middlewares");
const { userJoiSchema } = require("../../schemas");

const router = express.Router();

router.post(
  "/verify",
  validation(userJoiSchema.verifySchema),
  ctrlWrapper(ctrl.reVerifyEmail)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/",
  validation(userJoiSchema.subscriptionSchema),
  auth,
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;