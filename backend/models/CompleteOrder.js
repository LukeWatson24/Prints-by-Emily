const mongoose = require("mongoose");

const CompleteOrderSchema = new mongoose.Schema({
  paymentIntent: { type: Object, required: true },
  ProdigiOutcome: { type: Object, required: true },
});

module.exports = mongoose.model("CompleteOrder", CompleteOrderSchema);
