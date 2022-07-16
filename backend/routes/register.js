const express = require("express");
const router = express.Router();
const UsersModel = require("../Models/usersModel");

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

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

router.get("/verify-email", async (req, res) => {
  try {
    const token = req.query.token;
    const user = await UsersModel.findOne({ emailToken: token });
    if (user) {
      user.isVerified = true;
      await user.save();
      return res.send("<h1> Your mail is verified </h1>");
    } else {
      console.log("This email is not verified");

      return res.json({ stutus: "error" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const oldUser = await UsersModel.findOne({ email: req.body.email });
    if (oldUser) {
      return res.json({ status: "error", error: "Email is Already Exist!" });
    }
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    let dateOfBirth = req.body.dateOfBirth;
    let phoneNo = req.body.phoneNo;
    const Us = new UsersModel({
      firstName,
      lastName,
      email,
      password,
      emailToken: crypto.randomBytes(64).toString("hex"),
      isVerified: false,
      dateOfBirth,
      phoneNo,
      points: 0,
    });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(Us.password, salt);
    Us.password = hashPassword;
    await Us.save();
    const mailOptions = {
      from: ` " Verify your email" <virtualwallet2022@gmail.com>`,
      to: Us.email,
      subject: "Virtual Wallet - Verify your email",
      html: `<h2>${Us.firstName}! Thanks for registering on our website</h2>
      <h4> Please verify your mail to continue...</h4>
      <a href="http://${req.headers.host}/register/verify-email?token=${Us.emailToken}"><strong>Verify Your Email</strong></a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Vefication is sent");
      }
    });
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", error: error });
  }
});

module.exports = router;
