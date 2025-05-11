const express = require("express");
const router = express.Router();
const pool = require("../../connect");
const bcrypt = require("bcrypt");
const {
  validarCamposAlterarDadosUsuario,
} = require("../../utilidades/validadores");

router.put("/:id", async (req, res) => {
  const idCliente = req.params.id;
  const {
    email,
    senha,
    confirmarSenha,
    nome,
    sobrenome,
    celular,
    dataNascimento,
  } = req.body;

  const erro = validarCamposAlterarDadosUsuario(
    email,
    senha,
    confirmarSenha,
    nome,
    sobrenome,
    celular,
    dataNascimento
  );

  if (erro) return res.status(409).json({ mensagem: erro });

  try {
    if (!email && !senha && !nome && !sobrenome && !celular && !dataNascimento)
      return res.status(409).json({ mensagem: "Preencha todos os campos." });

    const verificarDuplicados = await pool.query(
      "SELECT email, celular FROM clientes WHERE (email = $1 OR celular = $2) AND id_cliente != $3",
      [email, celular, idCliente]
    );

    if (verificarDuplicados.rows.length > 0) {
      const duplicado = verificarDuplicados.rows[0];
      if (duplicado.email === email)
        return res
          .status(409)
          .json({ mensagem: "E-mail informado já é cadastrado" });

      if (duplicado.celular === celular)
        return res
          .status(409)
          .json({ mensagem: "Número de celular informado já é cadastrado" });
    }

    const dadosCadastrados = await pool.query(
      "SELECT email, senha, nome, sobrenome, celular, data_nascimento FROM clientes WHERE id_cliente = $1",
      [idCliente]
    );

    const usuarioCadastrado = dadosCadastrados.rows[0];
    const senhaCadastrada = usuarioCadastrado.senha;

    if (usuarioCadastrado.email === email)
      return res
        .status(409)
        .json({ mensagem: "E-mail não pode ser igual ao cadastrado." });
    if (
      usuarioCadastrado.nome === nome ||
      usuarioCadastrado.sobrenome === sobrenome
    )
      return res.status(409).json({
        mensagem: "Nome ou sobrenome não podem ser iguais aos cadastrados.",
      });
    if (usuarioCadastrado.celular === celular)
      return res
        .status(409)
        .json({ mensagem: "Celular não pode ser igual ao cadastrado." });
    if (usuarioCadastrado.dataNascimento === dataNascimento)
      return res.status(409).json({
        mensagem: "Data de nascimento não pode ser igual a cadastrada.",
      });

    if (email !== null) {
      await pool.query(`UPDATE clientes SET email = $1 WHERE id_cliente = $2`, [
        email,
        idCliente,
      ]);

      return res.status(200).json({ mensagem: "E-mail alterado." });
    }

    if (senha !== null && confirmarSenha !== null) {
      const senhaConfere = await bcrypt.compare(senha, senhaCadastrada);
      if (senhaConfere)
        return res
          .status(409)
          .json({ mensagem: "Senha não pode ser igual a cadastrada." });
      if (senha !== confirmarSenha)
        return res
          .status(409)
          .json({ mensagem: "As senhas digitadas são diferentes." });

      const senhaCriptografada = await bcrypt.hash(senha, 10);
      await pool.query(`UPDATE clientes SET senha = $1 WHERE id_cliente = $2`, [
        senhaCriptografada,
        idCliente,
      ]);

      return res.status(200).json({ mensagem: "Senha alterada." });
    }

    if (nome !== null && sobrenome !== null) {
      await pool.query(
        `UPDATE clientes SET nome = $1, sobrenome = $2 WHERE id_cliente = $3`,
        [nome, sobrenome, idCliente]
      );

      return res.status(200).json({ mensagem: "Nome e sobrenome alterados." });
    }

    if (celular !== null) {
      await pool.query(
        `UPDATE clientes SET celular = $1 WHERE id_cliente = $2`,
        [celular, idCliente]
      );

      return res.status(200).json({ mensagem: "Celular alterado." });
    }

    if (dataNascimento !== null) {
      await pool.query(
        `UPDATE clientes SET data_nascimento = $1 WHERE id_cliente = $2`,
        [dataNascimento, idCliente]
      );

      return res.status(200).json({ mensagem: "Data de nascimento alterada." });
    }
  } catch (error) {
    console.error("Erro ao alterar dados: ", error);
    res.status(500).send("Erro no servidor");
  }
});

module.exports = router;
