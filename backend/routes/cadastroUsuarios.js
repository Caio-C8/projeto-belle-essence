const express = require("express");
const router = express.Router();
const pool = require("../connect");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await pool.query("INSERT INTO clientes (email, senha) VALUES ($1, $2)", [
      email,
      senhaCriptografada,
    ]);
    res.status(201).send("Usuário cadastrado com sucesso!");
  } catch (err) {
    console.error("Erro ao cadastrar Usuário:", err);
    res.status(500).send("Erro no servidor");
  }
});

module.exports = router;
