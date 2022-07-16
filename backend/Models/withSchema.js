const mongoose = require("mongoose");

const widthdrawalSchema = mongoose.Schema({
  accountNo: { type: String, required: true },
  amount: { type: Number, required: true },
  id: { type: Number, unique: true },
});

module.exports = users = mongoose.model("users", widthdrawalSchema);
