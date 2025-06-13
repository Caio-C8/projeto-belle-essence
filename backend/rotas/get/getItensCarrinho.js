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

    return responder(res, {
      dados: { id_carrinho: carrinhoCliente.id_carrinho, itensCarrinho },
    });
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
