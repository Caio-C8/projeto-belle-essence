const express = require("express");
const router = express.Router();
const pool = require("../connect");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { email, senha, nome, sobrenome, celular, dataNascimento, cpf } =
    req.body;

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // 1. Cadastrar cliente
    const resultCliente = await pool.query(
      `INSERT INTO clientes (email, senha, nome, sobrenome, celular, data_nascimento, cpf)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id_cliente`,
      [email, senhaCriptografada, nome, sobrenome, celular, dataNascimento, cpf]
    );

    const idCliente = resultCliente.rows[0].id_cliente;

    // 2. Criar carrinho
    await pool.query(`INSERT INTO carrinhos (id_cliente) VALUES ($1)`, [
      idCliente,
    ]);

    // 3. Criar lista de favoritos
    await pool.query(`INSERT INTO listas_favoritos (id_cliente) VALUES ($1)`, [
      idCliente,
    ]);

    res
      .status(201)
      .send("Usuário, carrinho e lista de favoritos criados com sucesso!");
  } catch (err) {
    console.error("Erro ao cadastrar usuário:", err);
    res.status(500).send("Erro no servidor");
  }
});

module.exports = router;
