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
    } else {
      const newPoints = user.points + req.body.points;

      await UsersModel.updateOne(
        { email: user.email },
        { points: newPoints, $push: { transactions: transactions } }
      );
    }

    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

module.exports = router;
