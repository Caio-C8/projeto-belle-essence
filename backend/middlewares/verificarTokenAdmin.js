const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

function verificarAdmin(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return responder(res, {
      status: 401,
      sucesso: false,
      message: "Acesso negado. Token não fornecido.",
    });
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (decoded.tipo !== "admin") {
      return responder(res, {
        status: 403,
        sucesso: false,
        message: "Acesso restrito a administradores.",
      });
    }

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

module.exports = verificarAdmin;
