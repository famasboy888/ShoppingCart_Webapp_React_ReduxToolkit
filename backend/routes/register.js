const bycrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const { User } = require("../models/user");
const genAuthToken = require("../utils/genAuthToken");

const router = express.Router();

router.post("/", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(200).email().required(),
    password: Joi.string().min(3).max(200).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({
    email: req.body.email,
  });

  if (user) {
    return res
      .status(400)
      .send(
        `User email: ${req.body.email} already exist. Please register a different email.`
      );
  }

  //Hash password
  const salt = await bycrypt.genSalt(10);
  const newHashPassword = await bycrypt.hash(req.body.password, salt);

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: newHashPassword,
  });

  //Saving
  user = await user.save();

  const token = genAuthToken(user);

  res.send(token);
});

module.exports = router;
