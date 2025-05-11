const express = require("express");
const router = express.Router();
const {
  validarCamposAlterarEndereco,
} = require("../../utilidades/validadores");
const { buscarPorId, atualizarDadosPorId } = require("../../db/queries");

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

  if (erro) return res.status(409).json({ mensagem: erro });

  try {
    const enderecoCadastrado = await buscarPorId(
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
      return res
        .status(409)
        .json({ mensagem: "Altere algum dos campos para salvar." });

    if (logradouro !== logradouroCadastrado) {
      await atualizarDadosPorId("enderecos", "logradouro", "id_endereco", [
        logradouro,
        idEndereco,
      ]);
    }

    if (numero !== numeroCadastrado) {
      await atualizarDadosPorId("enderecos", "numero", "id_endereco", [
        numero,
        idEndereco,
      ]);
    }

    if (complemento !== complementoCadastrado) {
      await atualizarDadosPorId("enderecos", "complemento", "id_endereco", [
        complemento,
        idEndereco,
      ]);
    }

    if (pontoReferencia !== pontoReferenciaCadastrado) {
      await atualizarDadosPorId(
        "enderecos",
        "ponto_referencia",
        "id_endereco",
        [pontoReferencia, idEndereco]
      );
    }

    if (bairro !== bairroCadastrado) {
      await atualizarDadosPorId("enderecos", "bairro", "id_endereco", [
        bairro,
        idEndereco,
      ]);
    }

    if (cep !== cepCadastrado) {
      await atualizarDadosPorId("enderecos", "cep", "id_endereco", [
        cep,
        idEndereco,
      ]);
    }

    if (cidade !== cidadeCadastrada) {
      await atualizarDadosPorId("enderecos", "cidade", "id_endereco", [
        cidade,
        idEndereco,
      ]);
    }

    if (estado !== estadoCadastrado) {
      await atualizarDadosPorId("enderecos", "estado", "id_endereco", [
        estado,
        idEndereco,
      ]);
    }

    if (tipo !== tipoCadastrado) {
      await atualizarDadosPorId("enderecos", "tipo", "id_endereco", [
        tipo,
        idEndereco,
      ]);
    }

    return res
      .status(200)
      .json({ mensagem: "Endereço atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao alterar dados: ", error);
    res.status(500).send("Erro no servidor");
  }
});

module.exports = router;
