const express = require("express");
const router = express.Router();
const pool = require("../../connect");
const {
  validarCamposAlterarEndereco,
} = require("../../utilidades/validadores");

router.post("/", async (req, res) => {
  const {
    idCliente,
    logradouro,
    numero,
    bairro,
    cep,
    cidade,
    estado,
    tipo,
    complemento,
    pontoReferencia,
  } = req.body;

  if (!idCliente) {
    return res.status(400).json({ mensagem: "Cliente não identificado." });
  }

  const erro = validarCamposAlterarEndereco(
    logradouro,
    numero,
    bairro,
    cep,
    cidade,
    estado,
    tipo,
    complemento,
    pontoReferencia
  );

  if (erro) return res.status(409).json({ mensagem: erro });

  try {
    const resultado = await pool.query(
      `INSERT INTO enderecos (id_cliente, logradouro, numero, complemento, ponto_referencia, bairro, cep, cidade, estado, tipo) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING *`,
      [
        idCliente,
        logradouro,
        numero,
        complemento,
        pontoReferencia,
        bairro,
        cep,
        cidade,
        estado,
        tipo,
      ]
    );

    const enderecoCriado = resultado.rows[0];

    res.status(201).json({
      mensagem: "Endereço cadastrado com sucesso!",
      endereco: enderecoCriado,
    });
  } catch (error) {
    console.error("Erro ao cadastrar endereço:", error);
    res.status(500).json({ mensagem: "Erro ao cadastrar endereço" });
  }
});

module.exports = router;
