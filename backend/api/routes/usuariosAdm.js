const express = require("express");
const router = express.Router();
const pool = require("../connect");
const bcrypt = require("bcrypt");

// POST /produtos - cadastrar produto
router.post("/", async (req, res) => {
  const { emailAdm, senhaAdm } = req.body;

  try {
    const senhaCriptografada = await bcrypt.hash(senhaAdm, 10);

    await pool.query(
      "INSERT INTO administradores (email_adm, senha_adm) VALUES ($1, $2)",
      [emailAdm, senhaCriptografada]
    );
    res.status(201).send("Administrador cadastrado com sucesso!");
  } catch (err) {
    console.error("Erro ao cadastrar administrador:", err);
    res.status(500).send("Erro no servidor");
  }
});

module.exports = router;
