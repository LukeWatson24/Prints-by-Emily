const router = require("express").Router();
const fetch = require("node-fetch");
const CompleteOrder = require("../models/CompleteOrder");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/create-intent", async (req, res) => {
  const { amount } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "gbp",
    metadata: { integration_check: "accept_a_payment" },
  });

  try {
    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/", async (req, res) => {
  const params = {
    method: "POST",
    headers: {
      "X-API-Key": process.env.PRODIGY_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  };

  const response = await fetch(
    "https://api.sandbox.prodigi.com/v4.0/orders",
    params
  );
  const data = await response.json();

  try {
    res.json(data);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/complete", async (req, res) => {
  const order = new CompleteOrder({
    paymentIntent: req.body.paymentIntent,
    ProdigiOutcome: req.body.ProdigiOutcome,
  });

  try {
    const savedOrder = await order.save();
    res.json(savedOrder);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
