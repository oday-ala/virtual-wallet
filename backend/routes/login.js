const express = require("express");
const UsersModel = require("../Models/usersModel");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const verifyEmail = async (req, res, next) => {
  try {
    const user = await UsersModel.findOne({ email: req.body.email });
    if (user) {
      if (user.isVerified) {
        next();
      } else {
        return res.json({
          status: "Please check your email to verify your account",
          user: false,
        });
      }
    } else {
      return res.json({ status: "User not registered", user: false });
    }
  } catch (error) {
    console.log(error);
  }
};
router.post("/", verifyEmail, async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await UsersModel.findOne({
    email,
  });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign(
        { email: user.email, password: user.password },
        process.env.TOKEN
      );
      return res.json({ status: "ok", user: token });
    } else {
      return res.json({ status: "Invalid Password", user: false });
    }
  } else {
    return res.json({ status: "User not registered", user: false });
  }
});

module.exports = router;
