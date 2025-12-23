const jwt = require("jsonwebtoken");
const SECRET = "petscare_secret";

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization || req.query.token;
  let token = authHeader;

  if (!authHeader) {
    return res.status(401).json({ error: "Não autorizado" });
  }

  if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
    token = authHeader.slice(7);
  }

  try {
    jwt.verify(token, SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};


