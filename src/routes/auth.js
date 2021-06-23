const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validators/authValidation');

router.post('/register', async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { name, email, password } = req.body;
  const emailExist = await User.findOne({ email: email });
  if (emailExist) {
    return res.status(400).send('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    name: name,
    email: email,
    password: hashedPassword
  });

  try {
    const savedUser = await newUser.save();
    res.json({ email: savedUser.email });
  } catch (err) {
    res.json({ message: err });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  const validPass = await bcrypt.compare(password, user.password);

  if (!user || !validPass) {
    return res.status(400).send('Email or password incorrect');
  }

  // Create and assign JWT
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
});

// Delete user
router.delete('/:userId', async (req, res) => {
  try {
    const deletedUser = await User.remove({ _id: req.params.userId });
    res.json(deletedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
