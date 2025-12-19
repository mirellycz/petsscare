// src/routes/auth.routes.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const SECRET = "petscare_secret";

// Cadastro
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash });

  res.json(user);
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ error: "Usuário não encontrado" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Senha inválida" });

  const token = jwt.sign({ id: user.id }, SECRET);
  res.json({ token });
});

module.exports = router;
