const router = require("express").Router();
const Cart = require("../models/Cart");

router.post("/get", async (req, res) => {
  try {
    const userCart = await Cart.findOne({ userId: req.body.userId });
    return res.json(userCart);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/remove", async (req, res) => {
  try {
    const removeCart = await Cart.deleteOne({ userId: req.body.userId });
    return res.json(removeCart);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/update", async (req, res) => {
  const cartExists = await Cart.findOne({ userId: req.body.userId });

  if (!cartExists) {
    const cart = new Cart({
      userId: req.body.userId,
      cart: req.body.cart,
    });

    try {
      const savedCart = await cart.save();
      return res.json(savedCart);
    } catch (error) {
      res.json({ message: error });
    }
  } else {
    try {
      updatedCart = await Cart.updateOne(
        { userId: req.body.userId },
        { $set: { cart: req.body.cart } }
      );
      return res.json(updatedCart);
    } catch (error) {
      res.json({ message: error });
    }
  }
});

module.exports = router;
