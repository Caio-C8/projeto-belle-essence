const express = require("express");
const router = express.Router();
const { buscarPorColuna, deletarItemPorColuna } = require("../../db/queries");
const responder = require("../../utilidades/responder");

router.delete("/:id", async (req, res) => {
  const idEndereco = req.params.id;

  try {
    const endereco = await buscarPorColuna(
      "enderecos",
      "id_endereco",
      idEndereco
    );

    if (!endereco) {
      return responder(res, {
        status: 404,
        sucesso: false,
        mensagem: "Endereço não encontrado.",
      });
    }

    await deletarItemPorColuna("enderecos", "id_endereco", idEndereco);

    return responder(res, {
      mensagem: "Endereço excluído com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao excluir endereço:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
});

module.exports = router;
