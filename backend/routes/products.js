const router = require("express").Router();
const Product = require("../models/Product");

router.post("/new", async (req, res) => {
  const productSrcExists = await Product.findOne({ src: req.body.src });
  if (productSrcExists)
    return res
      .status(400)
      .send({ message: "Product with this image already exists" });

  const productNameExists = await Product.findOne({ name: req.body.name });
  if (productNameExists)
    return res
      .status(400)
      .send({ message: "Product with this name already exists" });

  const product = new Product({
    name: req.body.name,
    desc: req.body.desc,
    src: req.body.src,
    size: req.body.size,
    price: req.body.price,
  });
  try {
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/", async (req, res) => {
  const products = await Product.find();

  try {
    res.json(products);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
