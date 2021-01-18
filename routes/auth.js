const router = require("express").Router();

const User = require("../models/User");
const { registerValidation, loginValidation } = require("../utils/validation");
const jwt = require("jsonwebtoken");

const bycrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  // Validate
  const { error } = registerValidation(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  // check email already in database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("email already exits");

  //check retypepassword and password
  if (req.body.password !== req.body.retypePassword)
    return res.status(400).send("password isn't same");

  //hash the password
  const salt = await bycrypt.genSalt(10);
  const hashPassword = await bycrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

//login
router.post("/login", async (req, res) => {
  // Validate
  const { error } = loginValidation(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  // check email already in database
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("email doesn't exists");

  //if pass correct
  const validPass = await bycrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Password wrong");

  //create and assign a token

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("authorization", token).send(token);
});
module.exports = router;
