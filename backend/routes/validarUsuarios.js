const express = require("express");
const router = express.Router();
const pool = require("../connect");
const bcrypt = require("bcrypt");

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
      return res.status(401).send("E-mail ou senha incorretos.");
    }

    // Compara a senha fornecida com a senha criptografada
    const senhaConfere = await bcrypt.compare(senha, senhaCriptografada);

    if (!senhaConfere) {
      return res.status(401).send("E-mail ou senha incorretos.");
    }

    // Aqui você pode gerar um token de autenticação (ex: JWT) se quiser
    res.status(200).send("Login realizado com sucesso!");
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).send("Erro no servidor.");
  }
});

module.exports = router;

// Validar usuários no FrontEnd

// import React, { useState } from "react";

// const [email, setEmail] = useState("");
// const [senha, setSenha] = useState("");

// const login = async (e) => {
//   e.preventDefault();

//   const usuario = { email, senha };

//   const res = await fetch("http://localhost:3000/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(usuario),
//   });

//   const texto = await res.text();
//   alert(texto);
// };

// return (
//   <form onSubmit={login}>
//     <label>Email:</label>
//     <input
//       value={email}
//       type="email"
//       onChange={(e) => setEmail(e.target.value)}
//     />

//     <label>senha:</label>
//     <input
//       value={senha}
//       type="password"
//       onChange={(e) => setSenha(e.target.value)}
//     />

//     <button type="submit">login</button>
//   </form>
// );
