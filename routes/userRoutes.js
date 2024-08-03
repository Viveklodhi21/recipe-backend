const express = require("express");
const { body } = require("express-validator");
const { registerUser, loginUser } = require("../controllers/userController");
const router = express.Router();

router.post(
  "/register",
  [
    body("email", "Email is required").isEmail(),
    body("password", "Password should be at least 6 characters long").isLength({
      min: 6,
    }),
  ],
  registerUser
);
router.post(
  "/login",
  [
    body("email", "Email is required").isEmail(),
    body("password", "Password should be at least 6 characters long").isLength({
      min: 6,
    }),
  ],
  loginUser
);

module.exports = router;
