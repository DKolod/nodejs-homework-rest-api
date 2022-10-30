const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const { auth: ctrl } = require("../../controllers");
const { auth, validation } = require("../../middlewares");
const { userJoiSchema } = require("../../schemas");

const router = express.Router();

router.post(
  "/register",
  validation(userJoiSchema.userSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validation(userJoiSchema.userSchema),
  ctrlWrapper(ctrl.login)
);

router.post("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;