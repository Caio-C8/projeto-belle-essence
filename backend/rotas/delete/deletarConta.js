const express = require("express");
const router = express.Router();
const { buscarPorColuna, deletarItemPorColuna } = require("../../db/queries");
const responder = require("../../utilidades/responder");

router.delete("/:id", async (req, res) => {
  const idCliente = req.params.id;

  try {
    const contaCliente = await buscarPorColuna(
      "clientes",
      "id_cliente",
      idCliente
    );

    if (!contaCliente) {
      return responder(res, {
        status: 404,
        sucesso: false,
        mensagem: "Conta de usuário não encontrada.",
      });
    }

    await deletarItemPorColuna("clientes", "id_cliente", idCliente);

    return responder(res, {
      mensagem: "Conta excluída com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao excluir conta:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
});

module.exports = router;
