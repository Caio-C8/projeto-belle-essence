const express = require("express");
const { buscarPorColuna, buscarTodosPorColuna } = require("../../db/queries");
const responder = require("../../utilidades/responder");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const carrinhoCliente = await buscarPorColuna(
      "carrinhos",
      "id_cliente",
      id
    );

    const itensCarrinho = await buscarTodosPorColuna(
      "itens_carrinho",
      "id_carrinho",
      carrinhoCliente.id_carrinho
    );

    // Filtrar produtos ativos
    const ativos = [];

    for (const item of itensCarrinho) {
      const produto = await buscarPorColuna(
        "produtos",
        "id_produto",
        item.id_produto
      );
      if (produto && produto.ativo === true) {
        ativos.push(item);
      }
    }

    return responder(res, {
      dados: {
        id_carrinho: carrinhoCliente.id_carrinho,
        itensCarrinho: ativos,
      },
    });
  } catch (error) {
    console.error("Erro ao carregar itens do carrinho:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
});

module.exports = router;
