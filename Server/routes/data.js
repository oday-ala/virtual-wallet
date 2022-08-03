const express = require("express");
const router = express.Router();
const UsersModel = require("../Models/usersModel");
const mongodb = require("mongoose");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, process.env.TOKEN);
    const email = decoded.email;
    const user = await UsersModel.findOne({ email: email });
    return res.json(user);
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

router.post("/", async (req, res) => {
  token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, process.env.TOKEN);
    const email = decoded.email;
    const transactions = req.body.transactions;
    const user = await UsersModel.findOne({ email: email });
    let newPoints;
    let actions;
    console.log(transactions);
    if (req.body.accountShow) {
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const phoneNo = req.body.phoneNo;
      await UsersModel.updateMany(
        { email: user.email },
        {
          $set: {
            lastName: lastName,
            phoneNo: phoneNo,
            firstName: firstName,
          },
        }
      );
    } else if (req.body.showEarn) {
      newPoints = user.points - req.body.points;
      if (newPoints < 0) {
        return res.json({
          status: "ok",
          error: "You don't have enough points!",
        });
      }
      await UsersModel.updateMany(
        { email: user.email },
        {
          points: newPoints,
          $push: { transactions: transactions },
        }
      );

      return res.json({ status: "ok" });
    } else {
      newPoints = user.points + req.body.points;
      await UsersModel.updateOne(
        { email: user.email },
        {
          points: newPoints,
          actions: actions,
          $push: { transactions: transactions },
        }
      );
      return res.json({ status: "ok" });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

module.exports = router;
