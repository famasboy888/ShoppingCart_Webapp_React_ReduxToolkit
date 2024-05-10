const bycrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const { User } = require("../models/user");
const genAuthToken = require("../utils/genAuthToken");

const router = express.Router();

router.post("/", async (req, res) => {
  const schema = Joi.object({
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

  if (!user) {
    return res
      .status(400)
      .send(
        `User email: ${req.body.email} does not exist. Please register first.`
      );
  }

  const isValid = await bycrypt.compare(req.body.password, user.password);

  if (!isValid) {
    return res.status(400).send(`Invalid user or password.`);
  }

  const token = genAuthToken(user);

  res.send(token);
});

module.exports = router;
