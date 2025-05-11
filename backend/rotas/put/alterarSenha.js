const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { validarSenha, validarEmail } = require("../../utilidades/validadores");
const { buscarPorId, atualizarDadosPorId } = require("../../db/queries");

router.put("/", async (req, res) => {
  const { email, senha, confirmarSenha } = req.body;

  if (!email || !senha || !confirmarSenha)
    return res.status(409).json({ mensagem: "Preencha todos os campos." });

  const erroEmail = validarEmail(email);
  if (!erroEmail) return res.status(409).json({ mensagem: "E-mail inválido." });

  const erroSenha = validarSenha(senha);
  if (!erroSenha)
    return res.status(409).json({
      mensagem:
        "Senha deve conter no mínimo 8 caracteres, 1 letra, 1 símbolo e 1 número.",
    });

  if (senha !== confirmarSenha)
    return res
      .status(409)
      .json({ mensagem: "As senhas digitadas são diferentes." });

  try {
    const clienteCadastrado = await buscarPorId("clientes", "email", email);

    if (email !== clienteCadastrado.email)
      return res.status(409).json({ mensagem: "E-mail está incorreto" });

    const senhaConfere = await bcrypt.compare(senha, clienteCadastrado.senha);
    if (senhaConfere)
      res
        .status(409)
        .json({ mensagem: "Senha não pode ser igual a cadastrada." });

    const novaSenha = await bcrypt.hash(senha, 10);
    await atualizarDadosPorId("clientes", "senha", "email", [novaSenha, email]);

    return res.status(200).json({ mensagem: "Senha alterada." });
  } catch (error) {
    console.error("Erro ao alterar dados: ", error);
    res.status(500).send("Erro no servidor");
  }
});

module.exports = router;
