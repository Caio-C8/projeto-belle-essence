const express = require("express");
const router = express.Router();
const {
  buscarPorColuna,
  inserirRegistro,
  buscarTodosPorColuna,
} = require("../../db/queries");
const responder = require("../../utilidades/responder");

router.post("/", async (req, res) => {
  const { idProduto, idUsuario } = req.body;

  try {
    const carrinhoCliente = await buscarPorColuna(
      "carrinhos",
      "id_cliente",
      idUsuario
    );

    const itensCarrinhoCliennte = await buscarTodosPorColuna(
      "itens_carrinho",
      "id_carrinho",
      carrinhoCliente.id_carrinho
    );

    const itensNoCarrinho = itensCarrinhoCliennte.filter(
      (item) => item.id_produto === idProduto
    );

    if (itensNoCarrinho.length > 0)
      return responder(res, {
        status: 409,
        sucesso: false,
        mensagem: "Produto já está no carrinho.",
      });

    await inserirRegistro("itens_carrinho", {
      id_carrinho: carrinhoCliente.id_carrinho,
      id_produto: idProduto,
      qtde: 1,
    });

    return responder(res, {
      mensagem: "Produto adicionado na sacola.",
    });
  } catch (error) {
    console.error("Erro ao adiccionar produto no carrinho:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
});

module.exports = router;
