require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const { buscarPorColuna } = require("../db/queries");
const responder = require("../utilidades/responder");

router.post("/", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const administrador = await buscarPorColuna(
      "administradores",
      "email_adm",
      email
    );

    const cliente = await buscarPorColuna("clientes", "email", email);

    let usuario = null;
    let senhaCriptografada = "";

    if (administrador && administrador.senha_adm) {
      usuario = administrador;
      senhaCriptografada = usuario.senha_adm;
    } else if (cliente && cliente.senha) {
      usuario = cliente;
      senhaCriptografada = usuario.senha;
    } else {
      return responder(res, {
        status: 401,
        sucesso: false,
        mensagem: "E-mail ou senha incorretos.",
      });
    }

    const senhaConfere = await bcrypt.compare(senha, senhaCriptografada);

    if (!senhaConfere)
      return responder(res, {
        status: 401,
        sucesso: false,
        mensagem: "E-mail ou senha incorretos.",
      });

    const token = jwt.sign(
      {
        id: usuario.id_adm || usuario.id_cliente,
        email: usuario.email_adm || usuario.email,
        tipo: usuario.senha_adm ? "admin" : "cliente",
      },
      secret,
      { expiresIn: "2h" }
    );

    return responder(res, {
      mensagem: "Login realizado com sucesso!",
      dados: token,
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
});

module.exports = router;
