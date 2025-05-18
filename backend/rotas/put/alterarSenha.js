const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { validarSenha, validarEmail } = require("../../utilidades/validadores");
const { buscarPorColuna, atualizarColunaPorId } = require("../../db/queries");
const responder = require("../../utilidades/responder");

router.put("/", async (req, res) => {
  const { email, senha, confirmarSenha } = req.body;

  if (!email || !senha || !confirmarSenha)
    return responder(res, {
      status: 409,
      sucesso: false,
      mensagem: "Preencha todos os campos.",
    });

  const erroEmail = validarEmail(email);
  if (!erroEmail)
    return responder(res, {
      status: 401,
      sucesso: false,
      mensagem: "E-mail inválido.",
    });

  const erroSenha = validarSenha(senha);
  if (!erroSenha)
    return responder(res, {
      status: 401,
      sucesso: false,
      mensagem:
        "Senha deve conter no mínimo 8 caracteres, 1 letra, 1 símbolo e 1 número.",
    });

  if (senha !== confirmarSenha)
    return responder(res, {
      status: 401,
      sucesso: false,
      mensagem: "As senhas digitadas são diferentes.",
    });

  try {
    const clienteCadastrado = await buscarPorColuna("clientes", "email", email);

    if (email !== clienteCadastrado.email)
      return responder(res, {
        status: 401,
        sucesso: false,
        mensagem: "E-mail está incorreto",
      });

    const senhaConfere = await bcrypt.compare(senha, clienteCadastrado.senha);
    if (senhaConfere)
      return responder(res, {
        status: 409,
        sucesso: false,
        mensagem: "Senha não pode ser igual a cadastrada.",
      });

    const novaSenha = await bcrypt.hash(senha, 10);
    await atualizarColunaPorId("clientes", "senha", "email", [
      novaSenha,
      email,
    ]);

    return responder(res, {
      mensagem: "Senha alterada.",
    });
  } catch (error) {
    console.error("Erro ao alterar dados: ", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
});

module.exports = router;
