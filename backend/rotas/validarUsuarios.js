require("dotenv").config();
const express = require("express");
const router = express.Router();
const pool = require("../connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

router.post("/", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const resultAdministrador = await pool.query(
      "SELECT * FROM administradores WHERE email_adm = $1",
      [email]
    );

    const resultCliente = await pool.query(
      "SELECT * FROM clientes WHERE email = $1",
      [email]
    );

    let usuario = null;
    let senhaCriptografada = "";

    if (resultAdministrador.rows.length > 0) {
      usuario = resultAdministrador.rows[0];
      senhaCriptografada = usuario.senha_adm;
    } else if (resultCliente.rows.length > 0) {
      usuario = resultCliente.rows[0];
      senhaCriptografada = usuario.senha;
    } else {
      return res.status(401).json({ mensagem: "E-mail ou senha incorretos." });
    }

    const senhaConfere = await bcrypt.compare(senha, senhaCriptografada);

    if (!senhaConfere) {
      return res.status(401).json({ mensagem: "E-mail ou senha incorretos." });
    }

    const token = jwt.sign(
      {
        id: usuario.id_adm || usuario.id_cliente,
        email: usuario.email_adm || usuario.email,
        tipo: usuario.senha_adm ? "admin" : "cliente",
      },
      secret,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      mensagem: "Login realizado com sucesso!",
      token,
    });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).send("Erro no servidor.");
  }
});

module.exports = router;
