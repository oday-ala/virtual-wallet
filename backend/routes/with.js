const express = require("express");
const router = express.Router();
const UsersModel = require("../Models/usersModel");

const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const token = req.header("x-access-token");

  try {
    const decoded = jwt.verify(token, process.env.TOKEN);
    const email = decoded.email;
    const user = await UsersModel.findOne({ email: email });
    let sum = 0;
    const totalWithdrawal = user.withdrawal.map((el, indexe) => {
      return (sum = parseInt(sum) + el.amount);
    });
    return res.json({ data: user.withdrawal, amount: sum });
  } catch (error) {
    res.json({ status: "error", error: "invalid token" });
  }
});

router.post("/", async (req, res) => {
  token = req.headers["x-access-token"];
  try {
    let amount = req.body.amount;
    let accountNo = req.body.accountNo;
    let date = req.body.date;
    const decoded = jwt.verify(token, process.env.TOKEN);
    const email = decoded.email;
    const user = await UsersModel.findOne({ email: email });
    const id = user.withdrawal.length + 1;

    const withdrawal = {
      amount,
      accountNo,
      date,
      id,
    };

    const a = await UsersModel.findOneAndUpdate(
      { email: email },
      { $push: { withdrawal: withdrawal } }
    );
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

module.exports = router;
