const express = require("express");
const router = express.Router();
const { deletarItensPorColuna, buscarPorColuna } = require("../../db/queries");
const responder = require("../../utilidades/responder");

router.delete("/:idUsuario/:idProduto", async (req, res) => {
  const { idUsuario, idProduto } = req.params;

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
        mensagem: "Sacola não encontrada.",
      });
    }

    await deletarItensPorColuna("itens_carrinho", {
      id_carrinho: carrinhoCliente.id_carrinho,
      id_produto: idProduto,
    });

    return responder(res, {
      mensagem: "Produto removido da sacola.",
    });
  } catch (error) {
    console.error("Erro ao remover da sacola:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
});

module.exports = router;
