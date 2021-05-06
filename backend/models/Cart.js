const mongoose = require("mongoose");

const Cart = new mongoose.Schema({
  userId: { type: String, required: true },
  cart: { type: Array, required: true, default: [] },
});

module.exports = mongoose.model("carts", Cart);
