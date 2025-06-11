const express = require("express");
const router = express.Router();
const {
  validarCamposAlterarEndereco,
} = require("../../utilidades/validadores");
const { buscarPorColuna, atualizarColunaPorId } = require("../../db/queries");
const responder = require("../../utilidades/responder");

router.put("/:id", async (req, res) => {
  const idEndereco = req.params.id;
  const {
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

  if (erro)
    return responder(res, {
      status: 400,
      sucesso: false,
      mensagem: erro,
    });

  try {
    const enderecoCadastrado = await buscarPorColuna(
      "enderecos",
      "id_endereco",
      idEndereco
    );

    const logradouroCadastrado = enderecoCadastrado.logradouro;
    const numeroCadastrado = enderecoCadastrado.numero;
    const bairroCadastrado = enderecoCadastrado.bairro;
    const cepCadastrado = enderecoCadastrado.cep;
    const cidadeCadastrada = enderecoCadastrado.cidade;
    const estadoCadastrado = enderecoCadastrado.estado;
    const tipoCadastrado = enderecoCadastrado.tipo;
    const complementoCadastrado = enderecoCadastrado.complemento;
    const pontoReferenciaCadastrado = enderecoCadastrado.ponto_referencia;

    if (
      logradouro === logradouroCadastrado &&
      numero === numeroCadastrado &&
      bairro === bairroCadastrado &&
      cep === cepCadastrado &&
      cidade === cidadeCadastrada &&
      estado === estadoCadastrado &&
      tipo === tipoCadastrado &&
      complemento === complementoCadastrado &&
      pontoReferencia === pontoReferenciaCadastrado
    )
      return responder(res, {
        status: 400,
        sucesso: false,
        mensagem: "Altere algum dos campos para salvar.",
      });

    if (logradouro !== logradouroCadastrado) {
      await atualizarColunaPorId("enderecos", "logradouro", "id_endereco", [
        logradouro,
        idEndereco,
      ]);
    }

    if (numero !== numeroCadastrado) {
      await atualizarColunaPorId("enderecos", "numero", "id_endereco", [
        numero,
        idEndereco,
      ]);
    }

    if (complemento !== complementoCadastrado) {
      await atualizarColunaPorId("enderecos", "complemento", "id_endereco", [
        complemento,
        idEndereco,
      ]);
    }

    if (pontoReferencia !== pontoReferenciaCadastrado) {
      await atualizarColunaPorId(
        "enderecos",
        "ponto_referencia",
        "id_endereco",
        [pontoReferencia, idEndereco]
      );
    }

    if (bairro !== bairroCadastrado) {
      await atualizarColunaPorId("enderecos", "bairro", "id_endereco", [
        bairro,
        idEndereco,
      ]);
    }

    if (cep !== cepCadastrado) {
      await atualizarColunaPorId("enderecos", "cep", "id_endereco", [
        cep,
        idEndereco,
      ]);
    }

    if (cidade !== cidadeCadastrada) {
      await atualizarColunaPorId("enderecos", "cidade", "id_endereco", [
        cidade,
        idEndereco,
      ]);
    }

    if (estado !== estadoCadastrado) {
      await atualizarColunaPorId("enderecos", "estado", "id_endereco", [
        estado,
        idEndereco,
      ]);
    }

    if (tipo !== tipoCadastrado) {
      await atualizarColunaPorId("enderecos", "tipo", "id_endereco", [
        tipo,
        idEndereco,
      ]);
    }

    return responder(res, {
      mensagem: "Endereço atualizado com sucesso!",
      dados: {
        logradouro,
        numero,
        bairro,
        cep,
        cidade,
        estado,
        tipo,
        complemento,
        pontoReferencia,
      },
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
