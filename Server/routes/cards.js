const express = require("express");
const router = express.Router();
const UsersModel = require("../Models/usersModel");
const assert = require("assert");

const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const token = req.header("x-access-token");

  try {
    const decoded = jwt.verify(token, process.env.TOKEN);
    const email = decoded.email;
    const user = await UsersModel.findOne({ email: email });
    return res.json({ data: user.cards });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});
router.post("/", async (req, res) => {
  token = req.headers["x-access-token"];
  try {
    let accountNumber = req.body.accountNumber;
    let bankName = req.body.bankName;
    const decoded = jwt.verify(token, process.env.TOKEN);
    const email = decoded.email;

    const card = {
      bankName,
      accountNumber,
    };

    const a = await UsersModel.findOneAndUpdate(
      { email: email },
      { $push: { cards: card } }
    );
    if (!a) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

module.exports = router;
