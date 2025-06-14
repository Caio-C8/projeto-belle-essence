const express = require("express");
const router = express.Router();
const { deletarItensPorColuna, buscarPorColuna } = require("../../db/queries");
const responder = require("../../utilidades/responder");

router.delete("/:idUsuario", async (req, res) => {
  const { idUsuario } = req.params;

  try {
    const carrinhoCliente = await buscarPorColuna(
      "carrinhos",
      "id_cliente",
      idUsuario
    );

    if (!carrinhoCliente) {
      return responder(res, {
        status: 404,
        sucesso: false,
        mensagem: "Carrinho não encontrado.",
      });
    }

    await deletarItensPorColuna("itens_carrinho", {
      id_carrinho: carrinhoCliente.id_carrinho,
    });

    return responder(res, {
      mensagem: "Carrinho esvaziado com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao esvaziar carrinho:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro ao esvaziar carrinho no servidor.",
    });
  }
});

module.exports = router;
