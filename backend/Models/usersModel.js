const mongoose = require("mongoose");

const widthdrawalSchema = mongoose.Schema({
  accountNo: { type: String },
  amount: { type: Number },
  date: { type: String },
  id: { type: String },
});

const transactions = mongoose.Schema({
  id: { type: String },
  title: { type: String },
  date: { type: String },
  points: { type: String },
});

const cards = mongoose.Schema({
  bankName: { type: String },
  accountNumber: { type: String },
});

const User = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  emailToken: { type: String },
  isVerified: { type: Boolean },
  dateOfBirth: { type: String },
  phoneNo: { type: String },
  totalWithdrawal: { type: Number },
  withdrawal: [widthdrawalSchema],
  points: { type: Number },
  transactions: [transactions],
  cards: [cards],
  // userId: String,
});

const model = mongoose.model("user-data", User);

module.exports = model;
