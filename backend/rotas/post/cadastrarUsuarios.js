const express = require("express");
const router = express.Router();
const pool = require("../../connect");
const bcrypt = require("bcrypt");
const { validarCamposCadastro } = require("../../utilidades/validadores");

router.post("/", async (req, res) => {
  const { usuario, endereco } = req.body;
  const {
    email,
    senha,
    confirmarSenha,
    nome,
    sobrenome,
    celular,
    dataNascimento,
    cpf,
  } = usuario;

  const {
    cep,
    logradouro,
    numero,
    bairro,
    cidade,
    estado,
    complemento,
    pontoReferencia,
    tipo,
  } = endereco;

  const erro = validarCamposCadastro({
    email,
    senha,
    nome,
    sobrenome,
    celular,
    dataNascimento,
    cpf,
    cep,
    logradouro,
    numero,
    bairro,
    cidade,
    estado,
    tipo,
  });

  if (erro) res.status(400).json({ mensagem: erro });

  if (senha !== confirmarSenha)
    return res
      .status(400)
      .json({ mensagem: "As senhas digitadas são diferentes." });

  try {
    const verificarDuplicados = await pool.query(
      `SELECT email, celular, cpf FROM clientes WHERE email = $1 OR celular = $2 OR cpf = $3`,
      [email, celular, cpf]
    );

    if (verificarDuplicados.rows.length > 0) {
      const duplicado = verificarDuplicados.rows[0];
      if (duplicado.email === email) {
        return res
          .status(409)
          .json({ mensagem: "E-mail informado já é cadastrado" });
      }
      if (duplicado.celular === celular) {
        return res
          .status(409)
          .json({ mensagem: "Número de celular informado já é cadastrado" });
      }
      if (duplicado.cpf === cpf) {
        return res
          .status(409)
          .json({ mensagem: "CPF informado já é cadastrado" });
      }
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const resultCliente = await pool.query(
      `INSERT INTO clientes (email, senha, nome, sobrenome, celular, data_nascimento, cpf)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id_cliente`,
      [email, senhaCriptografada, nome, sobrenome, celular, dataNascimento, cpf]
    );

    const idCliente = resultCliente.rows[0].id_cliente;

    await pool.query(
      `INSERT INTO enderecos
        (id_cliente, cep, logradouro, numero, complemento, ponto_referencia, bairro, cidade, estado, tipo)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        idCliente,
        cep,
        logradouro,
        numero,
        complemento,
        pontoReferencia,
        bairro,
        cidade,
        estado,
        tipo,
      ]
    );

    await pool.query(`INSERT INTO carrinhos (id_cliente) VALUES ($1)`, [
      idCliente,
    ]);

    await pool.query(`INSERT INTO listas_favoritos (id_cliente) VALUES ($1)`, [
      idCliente,
    ]);

    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).send("Erro no servidor");
  }
});

module.exports = router;
