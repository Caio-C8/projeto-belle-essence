require("dotenv").config();
const jwt = require("jsonwebtoken");
const responder = require("../utilidades/responder");
const secret = process.env.JWT_SECRET;

function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return responder(res, {
      status: 401,
      sucesso: false,
      message: "Acesso negado. Token não fornecido.",
    });
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    const decoded = jwt.verify(token, secret);
    req.usuario = decoded;
    next();
  } catch (error) {
    console.error("Erro ao verificar token:", error.message);
    return responder(res, {
      status: 401,
      sucesso: false,
      message: "Token inválido.",
    });
  }
}

module.exports = verificarToken;
