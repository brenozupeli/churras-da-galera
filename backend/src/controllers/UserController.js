const User = require('../database/models/User');
const jwt = require('jsonwebtoken');
const { hashGenerator } = require('../utils/hash');

async function create(req, res) {
  const { email, password } = req.body;

  const hash = await hashGenerator(password);
  User.create({
    email,
    password: hash,
  });

  res.sendStatus(200);
}

function login(req, res) {
  let token = jwt.sign({ email: req.user.email }, process.env.jwtKey, {
    expiresIn: '24h',
  });

  res.status(200).send({ token });
}

module.exports = {
  create,
  login,
};
