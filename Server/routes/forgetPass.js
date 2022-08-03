const express = require("express");
const router = express.Router();
const UsersModel = require("../Models/usersModel");

const URL = process.env.URL;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

mongoose.connect(URL);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "virtualwallet2022@gmail.com",
    pass: "meurxnoehdfnnbii",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

router.post("/", async (req, res) => {
  try {
    const email = req.body.email;

    const user = await UsersModel.findOne({ email: email });
    if (user) {
      const mailOptions = {
        from: ` " Verify your email" <virtualwallet2022@gmail.com>`,
        to: user.email,
        subject: "Virtual Wallet - Reset You Password",
        html: `<h2>${user.firstName}! Thanks for using our website</h2>
        <h4> Please Enter to this link to continue...</h4>
        <a href="http://localhost:3000/reset-password?token=${user.emailToken}"><strong>Reset You Password</strong></a>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          res.json({ status: 200, msg: " Vefication is sent" });
        }
      });
      res.json({
        status: 200,
        msg: "Check Your Email to Reset Your Password",
      });
    } else {
      return res.json({ status: 205, msg: "Email does not exist!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: error });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const token = req.body.token;
    const password = req.body.password;
    const user = await UsersModel.findOne({ emailToken: token.token });

    if (user) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      user.password = hashPassword;
      user.save();
      return res.json({ stutus: "ok" });
    } else {
      return res.json({ stutus: "error" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
