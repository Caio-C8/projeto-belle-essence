const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

function verificarAdmin(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("Acesso negado. Token não fornecido.");
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (decoded.tipo !== "admin") {
      return res.status(403).send("Acesso restrito a administradores.");
    }

    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(401).send("Token inválido.");
  }
}

module.exports = verificarAdmin;
