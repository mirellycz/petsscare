const jwt = require("jsonwebtoken");
const SECRET = "petscare_secret";

module.exports = (req, res, next) => {
  const token = req.headers.authorization || req.query.token;

  if (!token) {
    return res.status(401).json({ error: "Não autorizado" });
  }

  try {
    jwt.verify(token, SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
};


