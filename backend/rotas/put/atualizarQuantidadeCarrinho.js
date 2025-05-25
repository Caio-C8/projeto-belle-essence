const express = require("express");
const responder = require("../../utilidades/responder");
const {
  buscarPorColuna,
  atualizarColunasPorCondicoes,
} = require("../../db/queries");
const router = express.Router();

router.put("/", async (req, res) => {
  const { idUsuario, idProduto, novaQuantidade } = req.body;

  try {
    if (novaQuantidade < 1)
      return responder(res, {
        status: 400,
        sucesso: false,
        mensagem: "Quantidade inválida.",
      });

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

    await atualizarColunasPorCondicoes(
      "itens_carrinho",
      {
        id_carrinho: carrinhoCliente.id_carrinho,
        id_produto: idProduto,
      },
      { qtde: novaQuantidade }
    );

    return responder(res, {
      mensagem: "Quantidade atualizada com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao atualizar quantidade:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor ao atualizar a quantidade.",
    });
  }
});

module.exports = router;
