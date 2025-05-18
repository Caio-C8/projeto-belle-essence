const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { validarCamposCadastro } = require("../../utilidades/validadores");
const { inserirRegistro } = require("../../db/queries");
const {
  buscarClientePorEmailOuCelularOuCpf,
} = require("../../db/queriesClientes");

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

  if (erro)
    return responder(res, {
      status: 400,
      sucesso: false,
      mensagem: erro,
    });

  if (senha !== confirmarSenha)
    return res
      .status(400)
      .json({ mensagem: "As senhas digitadas são diferentes." });

  try {
    const duplicado = await buscarClientePorEmailOuCelularOuCpf(
      email,
      celular,
      cpf
    );

    if (duplicado) {
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

    const cliente = await inserirRegistro("clientes", {
      email,
      senha: senhaCriptografada,
      nome,
      sobrenome,
      celular,
      data_nascimento: dataNascimento,
      cpf,
    });

    await inserirRegistro("enderecos", {
      id_cliente: cliente.id_cliente,
      cep,
      logradouro,
      numero,
      complemento,
      ponto_referencia: pontoReferencia,
      bairro,
      cidade,
      estado,
      tipo,
    });

    await inserirRegistro("carrinhos", { id_cliente: cliente.id_cliente });

    await inserirRegistro("listas_favoritos", {
      id_cliente: cliente.id_cliente,
    });

    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
});

module.exports = router;
