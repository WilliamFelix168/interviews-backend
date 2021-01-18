const router = require("express").Router();
const verify = require("./verifyToken");

const Product = require("../models/Product");

//get product
router.get("/", verify, async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (err) {
    res.json({ message: err });
  }
});

//create product
router.post("/", verify, async (req, res) => {
  console.log(req.body);
  const createProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    URL: req.body.URL,
  });
  try {
    const savedProduct = await createProduct.save();
    res.json(savedProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

//

module.exports = router;
