const express = require("express");
const router = express.Router();
const {
  validarCamposAlterarEndereco,
} = require("../../utilidades/validadores");
const { inserirRegistro } = require("../../db/queries");
const responder = require("../../utilidades/responder");

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
    return responder(res, {
      status: 404,
      sucesso: false,
      mensagem: "Cliente não identificado.",
    });
  }

  const erro = validarCamposAlterarEndereco(
    logradouro,
    numero,
    bairro,
    cep,
    cidade,
    estado,
    tipo
  );

  if (erro)
    return responder(res, {
      status: 400,
      sucesso: false,
      mensagem: erro,
    });

  try {
    const enderecoCadastrado = await inserirRegistro("enderecos", {
      id_cliente: idCliente,
      logradouro,
      numero,
      complemento,
      ponto_referencia: pontoReferencia,
      bairro,
      cep,
      cidade,
      estado,
      tipo,
    });

    return responder(res, {
      status: 201,
      mensagem: "Endereço cadastrado com sucesso!",
      dados: enderecoCadastrado,
    });
  } catch (error) {
    console.error("Erro ao cadastrar endereço:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
});

module.exports = router;
