const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  account_holder: String,
  account_id: String,
  account_type: String,
  balance:Number
});

module.exports = mongoose.model("Account", accountSchema);
